<template>
  <div ref="scxTableRef" :class="scrollingClass" :style="scxTableStyle" class="scx-table" @scroll="handleScroll">
    <!-- 加载数据时显示的 -->
    <loading v-if="loading"
             :style="{transform:contentTopDistance===0?'':'translateY('+scxTableRef.scrollTop+'px)'}"/>

    <div v-contextmenu="headFilterContextMenu" class="scx-table-head">
      <!-- 全选框 -->
      <div v-if="tableConfig.hasMultiSelectButton" class="fixed-left " style="width: 40px">
        <input v-model="allChecked" type="checkbox"/>
      </div>
      <!--  真正的表头开始 -->
      <div v-for="headItem in head.filter(h=>headFilterContextMenu.configs.checkboxModel.includes(h.prop))"
           :class="`${headItem.tableWidth?'':'scx-table-no-width'}`" :style="{'width':headItem.tableWidth}"
           @click="sortTable(headItem)">
        {{ headItem.label || $t(tableConfig.modelName + '.' + headItem.prop) }}
        <!--  排序的三角形 -->
        <div v-if="headItem.hasSort" :class="`${sortType.prop===headItem.prop&&sortType.order==='asc'?'asc':''}
           ${sortType.prop===headItem.prop&&sortType.order==='desc'?'desc':''}`"
             class="sort-group">
          <!--  向上的那个  -->
          <div class="sort-div-up"></div>
          <!--  向下的那个  -->
          <div class="sort-div-down"></div>
        </div>
      </div>
      <!--  操作列表头  -->
      <div v-if="tableConfig.hasOperation" :style="{width: tableConfig.operationWidth}" class="fixed-right">
        {{ $t('table.operation') }}
      </div>

    </div>

    <!-- 无数据时显示的 -->
    <div v-if="dataList.length===0" class="scx-table-no-data">
      无数据
    </div>

    <div :style="{transform:'translateY('+contentTopDistance+'px)'}">
      <!--  表格数据 -->
      <div v-for="rowItem in visibleData"
           :class="getTBodyClass(rowItem)"
           :style="{height: tableConfig.itemHeight + 'px'}"
           class="scx-table-body"
           @click="setChecked(rowItem)"
           @mousemove="tbodyMouseMove(rowItem,$event)"
           @mouseup="boxSelectionMouseup"
           @contextmenu.prevent="openMenu(rowItem,$event)">
        <div v-if="tableConfig.hasMultiSelectButton" class="fixed-left" style="width: 40px" @mousedown="mousedown">
          <input v-model="nowCheckedIndex" :value="tableConfig.rowKey(rowItem)" type="checkbox" @mousedown.stop=""/>
        </div>
        <div v-for="headItem in head.filter(h=>headFilterContextMenu.configs.checkboxModel.includes(h.prop))"
             :class="`${headItem.tableWidth?'':'scx-table-no-width'}`" :style="{width:headItem.tableWidth}">
          <slot :row="rowItem" :tableCol="headItem" name="content">
            <scx-v2t :v-nodes="tableColumnFormat(headItem,rowItem)"/>
          </slot>
        </div>
        <div v-if="tableConfig.hasOperation" :style="{width: tableConfig.operationWidth}" class="fixed-right "
             @click.stop="">
          <slot :row="rowItem" name="operation">
            -
          </slot>
        </div>
      </div>
    </div>

    <!-- 虚拟滚动高度占位 -->
    <div :style="{height: emptyDivHeight+'px'}" class="scx-table-empty"></div>
    <!-- 框框  -->
    <div v-show="boxSelection.visible" :style="boxSelectionStyle" class="scx-box-selection"></div>
  </div>
</template>
<script>

import {t} from "../../i18n";
import loading from "./loading/index.vue";
import {computed, h, inject, nextTick, onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {showContextMenu} from "../ScxContextMenu";
import "./index.css";
import {
  filterCheckboxRender,
  filterLinkRender,
  filterRegionRender,
  filterSelectRender,
  filterSwitchRender,
  filterUploadRender
} from "./filterUtils";

export default {
  name: 'scx-table',
  components: {
    loading
  },
  props: {
    head: {
      type: Array,
      required: true,
      default: () => []
    },
    body: {
      type: Array,
      required: true,
      default: () => []
    },
    config: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  emits: ['getList', 'handleDelete', 'handleUpdate', 'nextPage', 'previousPage', 'sort-change'],
  setup(props, context) {
    const crudContext = inject('crudContext');
    const optionArray = crudContext ? computed(() => crudContext.optionArray).value : {};
    //表格本身
    const scxTableRef = ref(null);
    //表格dom 参数 用于计算
    const scxTableDom = reactive({
      offsetHeight: 0,
      scrollTop: 0,
      scrollLeft: 0,
      clientWidth: 0,
      scrollWidth: 0
    });

    //此处无法直接使用 scxTableRef 因为此时页面中还没有渲染出数据
    function handleScroll() {
      scxTableDom.offsetHeight = scxTableRef.value.offsetHeight
      scxTableDom.scrollTop = scxTableRef.value.scrollTop
      scxTableDom.scrollLeft = scxTableRef.value.scrollLeft;
      scxTableDom.clientWidth = scxTableRef.value.clientWidth;
      scxTableDom.scrollWidth = scxTableRef.value.scrollWidth;
    }

    //整个组件的核心列表数据
    const dataList = ref([]);
    //整个组件的核心配置
    const tableConfig = reactive({
      hasMultiSelectButton: true,
      tableMaxHeight: null,
      itemHeight: 42,
      operationWidth: '120px',
      hasOperation: true,
      optionArray: null,
      hasRightClickMenu: true,
      rowKey: (r) => r.id
    });

    // 可见区域内第一个 item 的 index
    const start = computed(() => Math.floor((scxTableDom.scrollTop / tableConfig.itemHeight)));

    const visibleData = computed(() => dataList.value.slice(start.value, 6 + start.value + Math.ceil(scxTableDom.offsetHeight / tableConfig.itemHeight)));

    const contentTopDistance = computed(() => start.value * tableConfig.itemHeight);

    const nowCheckedIndex = ref([]);//当前选中数据的索引
    const allChecked = ref(false)//是否全部选中
    const isShift = ref(false)
    const ShiftStartRowIndex = ref(-1)

    const hasHorizontalScroll = ref(false);//是否有横向滚动条

    //多选的框
    const boxSelection = reactive({
      startLeft: 0,
      startTop: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      visible: false,
      type: false
    })

    const emptyDivHeight = computed(() => {
      const emptyDivHeightTemp = dataList.value.length * tableConfig.itemHeight - scxTableDom.offsetHeight;
      return emptyDivHeightTemp <= 0 ? 0 : emptyDivHeightTemp
    })

    const sortType = reactive({
      prop: '',
      order: 'asc'
    })


    //初始化 list 数据
    function initDataList(data) {
      dataList.value = data.map((d, index) => {
        return {...d, scx_table_index: index};
      });
      nextTick(() => {
        handleScroll();
      })
    }

    initDataList(props.body);

    watch(() => props.body, (newVal) => {
      initDataList(newVal);
    }, {
      deep: true,
    });

    //初始化 list 数据
    function initConfig(config) {
      Object.assign(tableConfig, config);
    }

    initConfig(props.config);

    watch(props.config, (newVal) => {
      initConfig(newVal);
    });


    //点击全选框事件
    watch(allChecked, (newVal, prevCount) => {
      if (newVal) {
        dataList.value.forEach(function (item, index) {
          if (!nowCheckedIndex.value.includes(tableConfig.rowKey(item))) {
            nowCheckedIndex.value.push(tableConfig.rowKey(item));
          }
        });
      } else {
        nowCheckedIndex.value = []
      }
    });


    function setChecked(rowItem) {
      const rowKeyValue = tableConfig.rowKey(rowItem);
      const row_scx_table_index = rowItem.scx_table_index;

      //shift 多选
      if (isShift.value) {
        if (ShiftStartRowIndex.value !== -1) {
          if (ShiftStartRowIndex.value < row_scx_table_index) {
            const a = dataList.value.filter(d => d.scx_table_index <= row_scx_table_index && d.scx_table_index > ShiftStartRowIndex.value).map(d => tableConfig.rowKey(d));
            nowCheckedIndex.value = nowCheckedIndex.value.concat(a)
          } else {
            const a = dataList.value.filter(d => d.scx_table_index >= row_scx_table_index && d.scx_table_index <= ShiftStartRowIndex.value).map(d => tableConfig.rowKey(d));
            nowCheckedIndex.value = nowCheckedIndex.value.concat(a)
          }
        }
      } else {
        ShiftStartRowIndex.value = row_scx_table_index
        if (nowCheckedIndex.value.includes(rowKeyValue)) {
          nowCheckedIndex.value = nowCheckedIndex.value.filter(n => n !== rowKeyValue)
        } else {
          nowCheckedIndex.value.push(rowKeyValue)
        }
      }

    }


    function mousedown(e) {
      if (e.buttons === 1) {
        boxSelection.startLeft = e.clientX
        boxSelection.startTop = e.clientY
        boxSelection.type = true
      }
    }

    function boxSelectionMouseup(e) {
      boxSelection.type = false
    }

    //移出的时候判断是否在框框内 不在就移除
    function tbodyMouseMove(v, e) {
      if (boxSelection.type) {
        const mouseNowLeft = e.clientX;//鼠标现在的位置
        const mouseNowTop = e.clientY;
        boxSelection.width = Math.abs(boxSelection.startLeft - mouseNowLeft);
        boxSelection.height = Math.abs(boxSelection.startTop - mouseNowTop)
        if (mouseNowTop > boxSelection.startTop) {
          boxSelection.top = boxSelection.startTop
        } else {
          boxSelection.top = mouseNowTop
        }
        if (mouseNowLeft > boxSelection.startLeft) {
          boxSelection.left = boxSelection.startLeft
        } else {
          boxSelection.left = mouseNowLeft
        }
        boxSelection.visible = true
        e = e.target.parentElement.getBoundingClientRect()
        const eX = e.top + (e.height / 2);
        const bMin = boxSelection.top;
        const bMax = boxSelection.top + boxSelection.height;

        if ((bMin < eX && bMax > eX) || (e.top < boxSelection.startTop && e.top + e.height > boxSelection.startTop)) {

          if (!nowCheckedIndex.value.includes(tableConfig.rowKey(v))) {
            nowCheckedIndex.value.push(tableConfig.rowKey(v))
          }
        } else {
          nowCheckedIndex.value = nowCheckedIndex.value.filter(d => d !== tableConfig.rowKey(v))
        }
      } else {
        boxSelection.visible = false
      }
    }

    //点击排序
    function sortTable(headItem) {
      if (headItem.hasSort) {
        if (sortType.prop === headItem.prop) {
          if (sortType.sortType === 'asc') {
            sortType.sortType = 'desc';
          } else {
            sortType.sortType = 'asc';
          }
        } else {
          sortType.prop = headItem.prop;
          sortType.sortType = 'asc';
        }
        context.emit('sort-change', sortType)
      }
    }

    //获取所有选中的数据
    function getSelection() {
      return props.body.filter(d => nowCheckedIndex.value.includes(tableConfig.rowKey(d)))
    }

    const headFilterContextMenu = reactive({
          configs: {
            checkboxModel: props.head.map(o => o.prop),
            type: 'checkbox',
            clickNoClose: true
          },
          itemList: props.head.map(hd => {
            return {
              label: hd.label || t(tableConfig.modelName + '.' + hd.prop),
              prop: hd.prop
            }
          })
        }
    );

    function openMenu(nowCheckedRow, e) {
      if (tableConfig.hasRightClickMenu) {
        showContextMenu(e, [
          {label: '刷新', callback: () => context.emit('getList')},
          {label: '编辑', callback: () => context.emit('handleUpdate', nowCheckedRow, 'update', 'table')},
          {label: '删除此条', callback: () => context.emit('handleDelete', nowCheckedRow, 'table')},
          {label: '删除选中', callback: () => context.emit('handleDelete', getSelection(), 'table')},
          {label: '上一页', callback: () => context.emit('previousPage')},
          {label: '下一页', callback: () => context.emit('nextPage')}
        ])
      }
    }

    function tableColumnFormat(tableCol, row) {
      const value = row[tableCol.prop];
      if (tableCol.type === 'select') {
        return filterSelectRender(tableCol, value, optionArray[tableCol.prop]);
      } else if (tableCol.type === 'checkbox') {
        return filterCheckboxRender(tableCol, value, optionArray[tableCol.prop]);
      } else if (tableCol.type === 'switch') {
        return filterSwitchRender(value)
      } else if (tableCol.type === 'region') {
        return filterRegionRender(value);
      } else if (tableCol.type === 'upload') {
        return filterUploadRender(value);
      } else if (tableCol.type === 'link') {
        return filterLinkRender(value);
      } else {
        return h('span', {}, tableCol.tableLabelFormat ? tableCol.tableLabelFormat(value) : value);
      }
    }

    function bindingKeyboardKeyUp(e) {
      //按键盘方向左键
      if (e.key === 'Shift') {
        //如果页面没有加载完 禁止下一页 防止向服务器发送过多请求
        isShift.value = false
      }
    }

    function bindingKeyboardKeyDown(e) {
      //按键盘方向左键
      if (e.key === 'Shift') {
        //如果页面没有加载完 禁止下一页 防止向服务器发送过多请求
        isShift.value = true
      }
    }

    function bindingOnResize() {
      hasHorizontalScroll.value = scxTableRef.value.clientWidth !== scxTableRef.value.scrollWidth;
    }

    onMounted(() => {
      bindingOnResize();
      window.addEventListener('keyup', bindingKeyboardKeyUp)
      window.addEventListener('resize', bindingOnResize)
      window.addEventListener('keydown', bindingKeyboardKeyDown)
    });

    onUnmounted(() => {
      //销毁所有 键盘事件 防止重复请求
      window.removeEventListener('keyup', bindingKeyboardKeyUp)
      window.removeEventListener('resize', bindingOnResize)
      window.removeEventListener('keydown', bindingKeyboardKeyDown)
    })


    function getTBodyClass(rowItem) {
      let a = rowItem.scx_table_index % 2 === 0;
      return {
        ...scrollingClass,
        checked: nowCheckedIndex.value.includes(tableConfig.rowKey(rowItem)),
        a: a,
        b: !a
      }
    }

    //控制样式
    const scrollingClass = computed(() => {
      let leftMost;//是否在最左侧
      let rightMost;//是否在最右侧
      if (scxTableDom.scrollLeft === 0) {
        leftMost = true
        rightMost = false
      } else if (scxTableDom.scrollWidth - (scxTableDom.scrollLeft + scxTableDom.clientWidth) <= 1) {
        rightMost = true
        leftMost = false
      } else {
        rightMost = false
        leftMost = false
      }

      return hasHorizontalScroll.value ? {
        'is-scrolling-left': leftMost,
        'is-scrolling-right': rightMost,
        'is-scrolling-middle': !leftMost && !rightMost
      } : null
    });

    //控制样式
    const scxTableStyle = computed(() => {
      return {
        maxHeight: tableConfig.tableMaxHeight,
        overflow: props.loading ? 'hidden' : '',
        userSelect: boxSelection.visible || isShift.value ? 'none' : ''
      }
    })

    const boxSelectionStyle = computed(() => {
      return {
        left: boxSelection.left + 'px',
        top: boxSelection.top + 'px',
        height: boxSelection.height + 'px',
        width: boxSelection.width + 'px'
      }
    })

    //全选 全选时全不选 向外提供的方法
    const selectAll = () => allChecked.value = !allChecked.value;
    //清楚全选数据 向外提供的方法
    const clearSelection = () => allChecked.value = false;

    return {
      tableConfig,
      scxTableRef,
      sortType,
      nowCheckedIndex,
      boxSelection,
      emptyDivHeight,
      visibleData,
      hasHorizontalScroll,
      scxTableStyle,
      boxSelectionStyle,
      dataList,
      headFilterContextMenu,
      contentTopDistance,
      scrollingClass,
      allChecked,
      getTBodyClass,
      tableColumnFormat,
      tbodyMouseMove,
      setChecked,
      boxSelectionMouseup,
      handleScroll,
      mousedown,
      sortTable,
      openMenu,
      selectAll,
      clearSelection,
      getSelection
    }
  }
}
</script>
