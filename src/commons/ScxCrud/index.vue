<template>
  <div class="scx-crud">
    <header v-if="crudConfig.hasQueryOperation||addButtons.length>0">
      <!--添加按钮 开始-->
      <div>
        <el-dropdown v-if="addButtons.filter(a=>a.isDropDown).length>1"
                     v-permission="['*',crudConfig.modelName+':save']"
                     :hide-on-click="false" class="header-item" split-button
                     type="success"
                     @click="addButtons.filter(a=>a.isDropDown)[0].callback()">
          <i class="el-dropdown__icon el-icon-circle-plus"/>
          {{ $t(addButtons.filter(a => a.isDropDown)[0].label) }}
          <template #dropdown>
            <el-dropdown-menu>
              <!--此处对自定义的添加按钮的下拉菜单进行渲染-->
              <div v-for="(col,index) in addButtons.filter(a=>a.isDropDown)" :key="'el-dropdown-item'+index">
                <el-dropdown-item v-if="index!==0" :disabled="crudContext[col.disableState]"
                                  @click.native="col.callback()">
                  {{ $t(col.label) }}
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button v-for="(col,index) in addButtons.filter(c=>!c.isDropDown)"
                   v-if="addButtons.filter(a=>a.isDropDown).length===1"
                   :key="'add-button'+index"
                   :type="col.colorType?col.colorType:'primary'"
                   class="header-item"
                   icon="el-icon-circle-plus"
                   @click="col.callback()">
          {{ $t(col.label) }}
        </el-button>
      </div>
      <!--添加按钮 结束-->
      <div v-html="messageDiv" style="margin:auto"></div>
      <!--查询列和查询按钮 开始-->
      <div v-if="crudConfig.hasQueryOperation">
        <!--查询列 开始-->
        <div v-for="(col,index) in scxCrudItems.filter(c=>c.isFilter)" :key="index"
             class="header-item">
          <scx-easy-item v-model="crudContext.queryParam.queryObject[col.prop]"
                         :isFilter="true"
                         :placeholder="col.label||t(crudConfig.modelName+'.'+col.prop)"
                         :scx-easy-item-config="col"
                         :style="{width:col.filterWidth||'120px'}"
                         @change="handleFilter"
                         @clear="handleFilter"
                         @keyupEnter="handleFilter"/>
        </div>
        <!--查询列 结束-->
        <!--搜索按钮  开始-->
        <el-button class="header-item" icon="el-icon-search" round type="primary"
                   @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
        <!--搜索按钮  结束-->
        <!--重置按钮 开始-->
        <el-button circle class="header-item" icon="el-icon-back" style="margin: 0 !important"
                   type="warning"
                   @click="resetQueryParam"/>
        <!--重置按钮 开始-->
      </div>
      <!--查询列和查询按钮 结束-->
    </header>
    <main>
      <!--table 表格 开始-->
      <scx-table ref="scxTableRef"
                 :body="crudContext.tableBody"
                 :config="crudConfig"
                 :hasTableOperation="crudConfig.hasTableOperation&&editButtons.length>0"
                 :head="scxCrudItems.filter(tableCol=>!tableCol.noShowInTable&&tableCol.type!=='html')"
                 :loading="crudContext.tableLoading"
                 @getList="getList"
                 @handleDelete="handleDelete"
                 @handleUpdate="handleUpdate"
                 @nextPage="nextPage"
                 @previousPage="previousPage"
                 @sort-change="sortByProp">
        <template v-slot:operation="{row}">
          <el-button v-for="(col,index) in editButtons.filter(e=>e.isShow?e.isShow(row):true)"
                     :key="index"
                     :type="col.colorType"
                     size="mini"
                     @click="col.callback(row)">
            {{ $t(col.label) }}
          </el-button>
        </template>
      </scx-table>
      <!--table 表格 结束-->
    </main>
    <footer>
      <!--左下方批量删除按钮 开始-->
      <el-popover v-if="crudConfig.hasBatchDelete"
                  v-model:visible="crudContext.deleteDialog.batchDeleteButtonVisible"
                  placement="top"
                  width="180">
        <p>
          {{ $t('table.isWillBeDelete') }}
          <span style="color: #ff4949">{{ $t('table.allSelectedData') }}</span>
          {{ $t('table.and') }}
          <span style="color: #ff4949">{{ $t('table.cannotRevoke') }}</span>
        </p>
        <div style="text-align: right;">
          <el-button size="mini" type="text" @click="crudContext.deleteDialog.batchDeleteButtonVisible = false">
            {{ $t('table.cancelNoSpace') }}
          </el-button>
          <el-button size="mini" type="danger" @click="batchDeleteModel(false)">
            {{ $t('table.confirmNoSpace') }}
          </el-button>
        </div>
        <template #reference>
          <el-button v-permission="['*',scxCrudConfig.modelName+':batchDelete']" class="footer-item" plain
                     type="danger">{{ $t('table.batchDelete') }}
          </el-button>
        </template>

      </el-popover>
      <el-pagination v-if="crudConfig.hasPagination" :currentPage="crudContext.queryParam.page"
                     :page-size="crudContext.queryParam.limit" :page-sizes="[10,  50, 200,500,1000]"
                     :total="crudContext.total" background
                     class="footer-item" layout='total, sizes, prev, pager, next, jumper' style="padding: 3px 0"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"/>
    </footer>
    <el-dialog v-model="crudContext.editDialog.visible" :append-to-body="crudConfig.appendToBody"
               :close-on-click-modal=false
               :title="t(crudContext.pageFlag==='create'?'table.add':'table.edit')"
               :width="crudConfig.dialogWidth" class="scx-dialog">
      <el-form ref="scxCreateAndUpdateFormRef" :class="crudConfig.tableInline?' ':'scx-dialog-inline'"
               :inline="crudConfig.tableInline"
               :label-width="crudConfig.labelWidth" :model="crudContext.temp" :rules="crudContext.rules"
               label-position="right">
        <!--此处根据 type 不同渲染不同的组件-->
        <el-form-item
            v-for="(col,index) in scxCrudItems.filter(c=>(c.type!=='tree')&&(c.type!=='group')&&(!c.showFlag||c.showFlag.includes(crudContext.pageFlag)))"
            :key="index"
            :class="col.inline?'scx-dialog-item-inline':''"
            :label="(col.label||t(scxCrudConfig.modelName+'.'+col.prop))+' : '"
            :prop="col.prop"
            :style="col.type==='tinymce'?'margin-right:0':''">
          <scx-easy-item v-model="crudContext.temp[col.prop]"
                         :disabled="(crudContext.pageFlag === 'update' && col.disableInEdit)"
                         :placeholder="getPlaceholder(col)" :scx-easy-item-config="col"
                         @keyupEnter="createOrUpdateModel()"/>
        </el-form-item>
        <div
            v-for="(groupCol) in scxCrudItems.filter(gc=>gc.type==='group'&&(!gc.showFlag||gc.showFlag.includes(pageFlag)))">
          <div v-for="(groupItems,b) in crudContext.temp[groupCol.prop]" :key="b" class="scx-dialog-group-item">
            <el-form-item
                v-for="(col,index) in groupCol.groupItem.filter(gi=>(gi.type!=='tree')&&(!gi.showFlag||gi.showFlag.includes(pageFlag)))"
                :key="index"
                :label="(col.label||t(scxCrudConfig.modelName+'.'+col.prop))+' : '"
                :prop="groupCol.prop+'.' + b + '.'+col.prop">

              <scx-easy-item :disabled="crudContext.pageFlag === 'update' && col.disableInEdit"
                             :placeholder="getPlaceholder(col)"
                             :scx-easy-item-config="col" :temp="crudContext.temp[groupCol.prop][b]"
                             @keyupEnter="createOrUpdateModel()"
              />

            </el-form-item>
            <el-form-item label='删除当前项 : '>
              <el-button icon="el-icon-plus" size="small"
                         type="danger"
                         @click="groupItemDelete(groupCol,b)">删除此{{ groupCol.label }}
              </el-button>
            </el-form-item>
          </div>
          <div class=" el-input btn-add-group" style="text-align: center">
            <el-button icon="el-icon-plus" size="small" type="success"
                       @click="groupItemAdd(groupCol)">
              添加{{ groupCol.label }}
            </el-button>
          </div>
        </div>
        <!-- 添加页面的树 开始-->
        <el-collapse v-if="scxCrudItems.filter(th=>th.type==='tree').length>0"
                     :value="crudContext.editDialog.collapseList">
          <el-collapse-item
              v-for="(col,index) in scxCrudItems.filter(c=>c.type==='tree'&&(!c.showFlag||c.showFlag.includes(crudContext.pageFlag)))"
              :key="'collapse-item'+index"
              :name="col.prop"
              :title="(col.label||t(crudConfig.modelName+'.'+col.prop))+' : '"
              style="font-size: 14px;">
            <scx-tree v-model="crudContext.temp[col.prop]"
                      :scx-tree-config="{buildUrl:col.buildUrl,
                                         labelProp:col.labelProp,
                                         hasCheckbox:true,
                                         valueProp:col.valueProp}"
            />
          </el-collapse-item>
        </el-collapse>
        <!-- 添加页面的树 结束 -->
      </el-form>
      <!--最下方 确认和取消 按钮-->
      <template v-slot:footer>
        <el-button :loading="crudContext.editDialog.confirmButtonLoading" type="primary"
                   @click="createOrUpdateModel()">
          {{ $t('table.confirmNoSpace') }}
        </el-button>
        <el-button @click="crudContext.editDialog.visible = false">
          {{ $t('table.cancelNoSpace') }}
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="crudContext.deleteDialog.visible" title="删除选中数据"
               @keyup.enter.native="batchDeleteModel(true)">
      <div class="batchDeleteMessage">您将要删除以下数据 删除后不能恢复 , 共 {{ crudContext.deleteDialog.tableBody.length }} 条 !!</div>
      <scx-table :body="crudContext.deleteDialog.tableBody"
                 :config="{maxHeight:350}"
                 :head="[{label:t(scxCrudConfig.modelName+'.'+scxCrudConfig.editShow)||'被删除数据',prop:scxCrudConfig.editShow}]"
                 :loading="false">
        <template v-slot:operation="{row}">
          <el-button size="mini" type="warning" @click="removeDeleteArray(row)">{{ $t('table.removeDeleteArray') }}
          </el-button>
        </template>
      </scx-table>
      <template v-slot:footer>
        <el-button :disabled="crudContext.deleteDialog.tableBody.length===0" type="primary"
                   @click="batchDeleteModel(false)">
          {{ $t('table.confirmNoSpace') }}
        </el-button>
        <el-button @click="crudContext.deleteDialog.visible = false">
          {{ $t('table.cancelNoSpace') }}
        </el-button>
      </template>
    </el-dialog>
    <el-backtop target=".scx-main-content"/>
  </div>
</template>

<script>
import {scrollTo} from '../../utils/scrollTo' //缓动函数
import {state} from "../../store";
import request from "../../utils/request"; //引入请求方法
import {t} from "../../i18n"; //引入请求方法
import "./index.css";
import {h, nextTick, onMounted, onUnmounted, provide, reactive, ref} from "vue"; //引入css
import {arrayToStr, getNowTimeStr, strIsNotBlank, strToArray} from "../../utils";
import {exportJsonToExcel} from "../../utils/exportToExcel";
import {filterRegion, filterSelect, filterSwitch} from "../ScxTable/filterUtils";
import {ElNotification} from "element-plus"; //引入css

export default {
  name: 'scx-crud',
  props: {
    scxCrudConfig: {
      type: Object,
      required: true,
      default: () => {
      }
    },
    scxCrudItems: {
      type: Array,
      required: true,
      default: () => []
    },
    scxAddButtons: {
      type: Array,
      default: () => []
    },
    scxEditButtons: {
      type: Array,
      default: () => []
    },
    messageDiv: {
      type: Object,
    }
  },
  setup(props, context) {
    //创建 需要获取 ref 的对象
    const scxCreateAndUpdateFormRef = ref(null);
    const scxTableRef = ref(null);

    //初始化 整个 crud 的数据
    const crudConfig = reactive({
      editShow: false,//添加 修改 删除 或恢复删除 时 右侧通知消息 显示的字段
      modelName: false,//实体类的名称  用于构建 Api 和国际化
      tableInline: true,//添加  或修改 弹出页面是否显示为 两列 默认为两列
      labelWidth: '100px',//添加 和修改页面的 label 的宽度 默认 '100px'
      dialogWidth: '50%',//弹出框的宽度 默认50%
      operationWidth: '160px',//操作列宽度
      hasCreateButton: true,//是否有添加按钮
      hasQueryOperation: true,//是否有查询项
      hasUpdateButton: true,//是否有更新按钮 注意 如果此两项 都为 false 则不显示 操作
      hasDeleteButton: true,//是否有删除按钮
      hasRightClickMenu: true,//是否有右键菜单
      hasTableOperation: true,//是否有表格右侧的 操作列 注意 此项不控制 右键菜单的 删除 与编辑
      hasMultiSelectButton: true,// 是否有多选按钮
      hasPagination: true,// 是否有分页组件 注意若不显示分页 则列表会一次查询出来
      hasBatchDelete: true,//是否有 批量删除 此项同时控制 下方的批量删除按钮 和键盘的delete 快捷键 (如果 hasShortcutKeys 为 true)
      hasShortcutKeys: true,// 是否有键盘快捷键
      hasExcelDownloadTemplateButton: true,
      hasExcelImport: true,
      hasExcelDownloadNowDisabled: true,//在添加按钮中 是否有 Excel 下载当前页面功能 //添加按钮的下拉选配置 注意!!! 若全部为 false 则 添加按钮会由下拉框按钮变为 普通的按钮
      hasExcelDownloadNowFilterDisabled: true, //在添加按钮中 是否有 Excel 下载过滤条件功能
      hasExcelDownloadAllDisabled: true,//在添加按钮中 是否有 Excel 全部导出
      listApi: false,
      createApi: false,
      deleteApi: false,
      revokeDeleteApi: false,
      checkUniqueApi: false,
      updateApi: false,
      autoCompleteApi: false,
      batchDeleteApi: false,
      infoApi: false,
      tableMaxHeight: '524px',// 表格是否使用内部滚动条并设置高度 如果不需要请设置为 null
      appendToBody: false,// 在父容器中使用 dialog 时请设置为 true 注意 正常状况不要进行设置 会导致 tinymce 失效
      customizeTemp: null,
    });
    new function initCrudConfig() {
      Object.assign(crudConfig, props.scxCrudConfig);
      crudConfig.editShow = props.scxCrudConfig.editShow ? props.scxCrudConfig.editShow : props.scxCrudItems[0].prop;
      const baseCrudApi = '/api/' + crudConfig.modelName;
      crudConfig.listApi = props.scxCrudConfig.listApi ? props.scxCrudConfig.listApi : baseCrudApi + '/list';
      crudConfig.createApi = props.scxCrudConfig.createApi ? props.scxCrudConfig.createApi : baseCrudApi;
      crudConfig.deleteApi = props.scxCrudConfig.deleteApi ? props.scxCrudConfig.deleteApi : baseCrudApi + '/';
      crudConfig.revokeDeleteApi = props.scxCrudConfig.revokeDeleteApi ? props.scxCrudConfig.revokeDeleteApi : baseCrudApi + '/revokeDelete/';
      crudConfig.checkUniqueApi = props.scxCrudConfig.checkUniqueApi ? props.scxCrudConfig.checkUniqueApi : baseCrudApi + '/checkUnique';
      crudConfig.updateApi = props.scxCrudConfig.updateApi ? props.scxCrudConfig.updateApi : baseCrudApi;
      crudConfig.autoCompleteApi = props.scxCrudConfig.autoCompleteApi ? props.scxCrudConfig.autoCompleteApi : baseCrudApi + '/getAutoComplete/';
      crudConfig.batchDeleteApi = props.scxCrudConfig.batchDeleteApi ? props.scxCrudConfig.batchDeleteApi : baseCrudApi + '/batchDelete';
      crudConfig.infoApi = props.scxCrudConfig.infoApi ? props.scxCrudConfig.infoApi : baseCrudApi + '/';
    };

    //初始化 添加按钮数据
    const addButtons = ref([ //添加按钮的数据
      {
        prop: 'create',
        label: 'table.add',
        callback: () => {
          handleCreate('create')
        },
        colorType: 'success',
        isDropDown: true
      },
      {
        prop: 'excelDownloadNow',
        label: 'table.excelDownloadNow',
        callback: () => {
          handleExcelDownload(1)
        },
        disableState: 'handleExcelDownloadNowPageDisabled',
        isDropDown: true
      }, {
        prop: 'excelDownloadNowFilter',
        label: 'table.excelDownloadNowFilter',
        callback: () => {
          handleExcelDownload(2)
        },
        disableState: 'handleExcelDownloadNowDisabled',
        isDropDown: true
      }, {
        prop: 'excelDownloadAll',
        label: 'table.excelDownloadAll',
        callback: () => {
          handleExcelDownload(3)
        },
        disableState: 'handleExcelDownloadAllDisabled',
        isDropDown: true
      }]);
    new function initAddButtons() {
      addButtons.value = addButtons.value.concat(props.scxAddButtons);
      const excludedAddButtonProps = [];
      !crudConfig.hasCreateButton && excludedAddButtonProps.push('create');
      !crudConfig.hasExcelDownloadTemplateButton && excludedAddButtonProps.push('excelDownloadTemplate');
      !crudConfig.hasExcelImport && excludedAddButtonProps.push('excelImport');
      !crudConfig.hasExcelDownloadNowDisabled && excludedAddButtonProps.push('excelDownloadNow');
      !crudConfig.hasExcelDownloadNowDisabled && excludedAddButtonProps.push('excelDownloadNow');
      !crudConfig.hasExcelDownloadNowFilterDisabled && excludedAddButtonProps.push('excelDownloadNowFilter');
      !crudConfig.hasExcelDownloadAllDisabled && excludedAddButtonProps.push('excelDownloadAll');
      addButtons.value = addButtons.value.filter(item => !excludedAddButtonProps.includes(item.prop))
    };

    //初始化 右侧操作的按钮数据
    const editButtons = ref([//表格内列编辑按钮的数据
      {
        prop: 'edit',
        label: "table.edit",
        colorType: 'primary',
        callback: (row) => {
          handleUpdate(row, 'update', 'table')
        }
      }, {
        prop: 'delete',
        label: "table.delete",
        colorType: 'danger',
        callback: (row) => {
          handleDelete(row)
        }
      }]);
    new function initEditButtons() {
      editButtons.value = editButtons.value.concat(props.scxEditButtons);
      const excludedEditButtonProps = [];
      !crudConfig.hasUpdateButton && excludedEditButtonProps.push('edit');
      !crudConfig.hasDeleteButton && excludedEditButtonProps.push('delete');
      editButtons.value = editButtons.value.filter(item => !excludedEditButtonProps.includes(item.prop))
    }

    //初始化整个 crudContext 的上下文对象
    const crudContext = reactive({//右侧 Table 的数据
      optionArray: {},//用来存储所有下拉选 和自动完成框的数据
      pageFlag: '',//当前页面类型 根据这个进行 添加页面的元素过滤 如 create update 等
      temp: {},//数据操作的临时对象 !!!很重要!!!
      tableBody: [],//整个表格列表的数据
      tableLoading: true,//table 加载状态
      queryParam: {page: 0, limit: 10,orderBy:{orderByColumn:'id',sortType:'desc'},queryObject:{}},//查询参数 page : 请求页数 , limit : 一页数量 ,sort : 正序还是倒序 ,orderBy : 排序依据的字段 默认是根据 id 这样速度最快
      total: 0,//总条数
      rules: {},//添加和修改页面的 表单验证条件 此值会根据 tableDate 自动构建
      handleExcelDownloadNowPageDisabled: false,//下载当前页 Excel 的条目是否禁用状态 用于防止重复点击
      handleExcelDownloadNowDisabled: false,//下载当前过滤条件的 Excel 的条目是否禁用状态 用于防止重复点击
      handleExcelDownloadAllDisabled: false,//下载全部 Excel 的条目是否禁用状态 用于防止重复点击
      editDialog: {
        confirmButtonLoading: false,//添加或修改页面的 确认按钮是否处于 loading 状态 防止重复点击 造成多条数据添加
        visible: false,//添加和删除的的 dialog 显示状态
        collapseList: []
      },
      deleteDialog: {   //删除的 dialog 显示状态
        visible: false,//批量删除确认框显示状态
        batchDeleteButtonVisible: false,//左下角 批量删除按钮的弹框显示状态
        tableBody: [],//删除对话框 显示的 要删除的数据
      }
    });
    new function initCrudContext() {
      //构建 上方的查询选项用到的 查询参数
      for (let key in props.scxCrudItems) {
        let tableEntity = props.scxCrudItems[key];
        //向 temp(临时操作对象) 里添加所有的元素的属性
        if (tableEntity.type === 'group') {
          //group 字段 设置值为 空数组
          crudContext.temp[tableEntity.prop] = [];
        } else {
          //普通的 字段 设置值为 空字符串
          crudContext.temp[tableEntity.prop] = '';
        }
        //如果元素属于查询列 在 queryParam 里添加当前元素的属性 并设置值为 空字符串
        if (tableEntity.isFilter) {
          crudContext.queryParam.queryObject[tableEntity.prop] = ''
        }
        //默认过滤项参数 一般用法为设置此值 但是隐藏此项 实现页面初始化过滤
        if (tableEntity.defaultFilterValue !== undefined) {
          crudContext.queryParam.queryObject[tableEntity.prop] = tableEntity.defaultFilterValue
        }
        //如果页面有树 设置是否默认展开
        if (tableEntity.collapseOpen) {
          crudContext.editDialog.collapseList.push(tableEntity.prop)
        }
        //下拉选加载数据
        if (tableEntity.type === 'select' || tableEntity.type === 'checkbox' || tableEntity.type === 'radio') {
          if (tableEntity.buildUrl) {
            //此处使用 同步 因为必须在加载整个页面数据之前  完成下拉选数据的加载
            getOptionByBuildUrl(tableEntity.buildUrl).then(data => {
              // optionArray 是一个类似于键值对的对象 key 存储的是 当前下拉选列的 名称
              // value 存储的是从后台获取的下拉选的数据
              crudContext.optionArray[tableEntity.prop] = data.items
            })
          } else {
            if (Object.prototype.toString.call(tableEntity.option[0]) === "[object String]") {
              crudContext.optionArray[tableEntity.prop] = tableEntity.option.map(o => {
                return {label: o, value: o}
              });
            } else {
              crudContext.optionArray[tableEntity.prop] = tableEntity.option
            }
          }
        }
        //获取自动完成框数据
        if (tableEntity.autoComplete) {
          request.post(crudConfig.autoCompleteApi + tableEntity.prop, {}).then(data => {
            crudContext.optionArray[tableEntity.prop] = data.items
          })
        }
      }
      //当页面准备完毕 开始加载数据
      getList();
    }

    //点击添加页面
    function handleCreate(flag) {
      //设置添加确认按钮loading 为false 表示可以点击
      crudContext.editDialog.confirmButtonLoading = false;
      //设置当前页面的 flag 是 create 还是 update
      crudContext.pageFlag = flag;
      //清洗临时数据
      resetTemp();
      //准备添加页面的下拉选 自动完成框等数据并添加校验规则
      preparationDataAndAddingRules();
      //弹出页面
      crudContext.editDialog.visible = true;
    }

    //点击修改
    function handleUpdate(row, flag) {
      crudContext.editDialog.confirmButtonLoading = false;
      crudContext.pageFlag = flag;
      Object.assign(crudContext.temp, row);
      preparationDataAndAddingRules();
      //显示页面
      crudContext.editDialog.visible = true;
    }

    //清空 temp 中的所有属性值
    function resetTemp() {
      crudContext.temp = {};
      for (let key in props.scxCrudItems) {
        let dataEntity = props.scxCrudItems[key];
        //向 temp(临时操作对象) 里添加所有的元素的属性 并设置值为 空字符串
        if (dataEntity.type === 'group' || dataEntity.type === 'checkbox') {
          crudContext.temp[dataEntity.prop] = [];
        } else {
          //如果有默认值在此设置
          crudContext.temp[dataEntity.prop] = dataEntity.defaultValue ? dataEntity.defaultValue : '';
        }
      }
    }

    async function preparationDataAndAddingRules() {
      let nowFormData = props.scxCrudItems;
      //对当前选中行的数据的格式进行 清洗过滤 便于在修改页面中展示
      for (let key in nowFormData) {
        let tableEntity = nowFormData[key];
        //首先生成页面的下拉选
        if (tableEntity.type === 'select' && tableEntity.buildUrl) {
          await getOptionByBuildUrl(tableEntity.buildUrl).then(data => {
            crudContext.optionArray[tableEntity.prop] = data.items
          })
        }
        //此处分为两类一种是 添加时 一种是修改时
        if (crudContext.pageFlag === 'create') {
          //首先给默认值
          // 这种类型 是在页面中自行添加 html 标签用的 每次都要把 上一次的 清除掉
          if (tableEntity.type === 'html') {
            let index = nowFormData.indexOf(tableEntity);
            nowFormData.splice(index, 1);
          }

        } else if (crudContext.pageFlag === 'update') {
          //这种类型 不想再修改页面显示值 比如 password 等
          if (tableEntity.noShowValueInEdit) {
            crudContext.temp[tableEntity.prop] = ''
          }
          //如果是 区域级联选择器
          if (tableEntity.type === 'region') {
            //如果 temp 存储的 不是 数组 先把 str 转为 数组
            crudContext.temp[tableEntity.prop] = strToArray(crudContext.temp[tableEntity.prop], true)

          }  //如果是 区域级联选择器
          if (tableEntity.type === 'checkbox') {
            //如果 temp 存储的 不是 数组 先把 str 转为 数组
            crudContext.temp[tableEntity.prop] = strToArray(crudContext.temp[tableEntity.prop])
          }
        }
        //对校验规则进行设置
        if (tableEntity.rules) {
          crudContext.rules[tableEntity.prop] = [formatRules(crudConfig.modelName, tableEntity)]
        }
        //如果是 group 类型 则要对里面的数据进行校验
        if (tableEntity.type === 'group') {
          let groupRules = 0;
          if (crudContext.temp[tableEntity.prop]) {
            groupRules = crudContext.temp[tableEntity.prop].length - 1;
          }
          for (let i = 0; i <= groupRules; i++) {
            for (let key1 in tableEntity.groupItem) {
              let groupItemRules = tableEntity.groupItem[key1];
              //对校验规则进行设置
              if (groupItemRules.rules) {
                crudContext.rules[tableEntity.prop + '.' + i + '.' + groupItemRules.prop] = [formatRules(groupItemRules)]
              }
            }
          }
        }
      }
      //清空当前表单的校验
      await nextTick(() => {
        scxCreateAndUpdateFormRef.value.clearValidate()
      })
    }

    //点击删除
    function handleDelete(row) {
      //获取删除 选项是为物理删除还是逻辑删除 (此项由后端决定)
      if (state.user.realDelete) {
        crudContext.deleteDialog.tableBody = Array.isArray(row) ? row : [row]
        if (crudContext.deleteDialog.tableBody.length === 0) {
          crudContext.deleteDialog.batchDeleteButtonVisible = false
        } else {
          crudContext.deleteDialog.visible = true
        }
      } else {
        //因为需要在 通知消息里 创建 按钮 此处进行构建
        request.delete(crudConfig.deleteApi + row.id, {}).then(data => {
          //删除方式可能有两种 一个是标记删除  一个是物理删除
          // 删除方式在后台 配置 因为 标记删除可以回复 所以在此处进行判断
          // isRealDelete 说明删除成功 并且 删除方式为 标记删除
          if (data.message === 'success') {
            const _notify = ElNotification({
              title: '删除成功',
              message: h('div', {style: 'width:240px'}, [
                h('p', {}, '已成功删除 :' + row[crudConfig.editShow]),
                h('el-button', {
                  style: 'margin-left:20px;float:right',
                  size: 'mini',
                  type: 'success',
                  icon: 'el-icon-back',
                  onClick: () => revokeDelete(row, _notify)
                }, '点击恢复')
              ]),
              type: 'success',
              dangerouslyUseHTMLString: true,
              duration: 4000
            });
            //此处将 删除的数据 从列表中移除
            const index = crudContext.tableBody.indexOf(row);
            crudContext.tableBody.splice(index, 1);
            //总条数 减少 一个
            crudContext.total = crudContext.total - 1;
          } else {
            //删除失败
            ElNotification({
              title: '删除失败',
              message: h('a', {
                onClick: () => {
                  console.log(row.id)
                }
              }, '恢复数据'),
              type: 'error',
              dangerouslyUseHTMLString: true,
              duration: 4000
            });
          }
        })
      }
    }


    //上一页
    function previousPage() {
      //页面减 1
      crudContext.queryParam.page += -1;
      //如果小于 1 证明当前页面是 第一页 不做查询操作 用于减少后台并发量
      if (crudContext.queryParam.page < 1) {
        crudContext.queryParam.page = 1
      } else {
        //否则执行查询方法
        getList()
      }
    }

    //下一页
    function nextPage() {
      crudContext.queryParam.page += 1;
      getList()
    }

    //根据 键盘delete 删除
    function deleteByKeyBoard() {
      if (crudConfig.hasBatchDelete) {
        crudContext.deleteDialog.tableBody = scxTableRef.value.getSelection();
        if (crudContext.deleteDialog.tableBody.length === 0) {
          crudContext.deleteDialog.batchDeleteButtonVisible = false
        } else {
          crudContext.deleteDialog.visible = true
        }
      }
    }

    //批量删除 主方法
    function batchDeleteModel(fromKeyBorder) {
      //要删除的 对象的 id 数组
      let deleteIds = [];
      //向后台发送 请求的 对象
      let tempData = {'deleteIds': deleteIds};
      //如果不是 通过 键盘删除的 实际 this.deleteObjectArray 中并没有数据 所以在此获取一下 要删除的数据
      if (!fromKeyBorder) {
        crudContext.deleteDialog.tableBody = scxTableRef.value.getSelection()
      }
      deleteIds = crudContext.deleteDialog.tableBody.map(d => d.id);
      //如果 数据为空 显示提示框
      if (deleteIds.length === 0) {
        crudContext.deleteDialog.batchDeleteButtonVisible = false;
        ElNotification({
          title: t('table.noDataSelected'),
          type: 'warning',
          duration: 4000
        });
      } else {
        //数据校验全部没问题 可以进行 批量删除
        request.delete(crudConfig.batchDeleteApi, tempData).then(response => {
          if (response.message === 'success') {
            crudContext.deleteDialog.batchDeleteButtonVisible = false;
            //清空多选数据存储对象
            //关闭删除 dialog
            crudContext.deleteDialog.visible = false;
            //清空多选数据
            scxTableRef.value.clearSelection();

            if (deleteIds.length === 1) {
              ElNotification({
                title: '删除成功',
                message: h('div', {style: 'width:240px'}, h('p', {}, '已成功删除 :' + crudContext.deleteDialog.tableBody[0][crudConfig.editShow])),
                type: 'success',
                dangerouslyUseHTMLString: true,
                duration: 4000
              });

              const index = crudContext.tableBody.indexOf(crudContext.deleteDialog.tableBody[0]);
              crudContext.tableBody.splice(index, 1);
              crudContext.total = crudContext.total - 1;

            } else {
              ElNotification({
                title: '已删除全部选中数据 , 共' + response.deletedCount + '条 !',
                type: 'success',
                duration: 4000
              });
              //todo 因为删除项过多可能造成页数改变
              //此处暂时不考虑多人同时删除的情况
              //如果删除的条数 大于或等于 当前页面显示的条数 说明当前页面已经被删没了
              //但是无法判断到底删除了几页  !!!其实此处可以通过一些复杂的方法 判断 待定
              //所以此处将页数重置为 0 获取第一页
              if (response.deletedCount >= crudContext.tableBody.length) {
                crudContext.queryParam.page = 0;
              }
              getList();
            }
            crudContext.deleteDialog.tableBody = [];
          } else {
            ElNotification({
              title: '批量删除失败 !!!',
              type: 'error',
              duration: 4000
            });
          }
        })
      }
    }

    //恢复删除 功能
    function revokeDelete(data, _notify) {
      //调用恢复删除 api
      request.get(crudConfig.revokeDeleteApi + data.id).then(req => {
        //如果 恢复删除成功
        if (req.message === 'success') {
          //将恢复删除的 数据插入 页面中
          crudContext.tableBody.unshift(req.items);
          //关闭 恢复删除的框框
          _notify.close();
          //页面条数 加一
          crudContext.total = crudContext.total + 1;
        } else {
          ElNotification({
            title: t("table.revokeDeleteError"),
            type: 'error',
            duration: 4000
          });
        }
      })
    }

    //点击table 表头进行排序
    function sortByProp(column) {
      crudContext.queryParam.orderBy.orderByColumn = column.prop
      crudContext.queryParam.orderBy.sortType = column.sortType
      getList();
    }


    function handleSizeChange(val) {
      crudContext.queryParam.limit = val
      getList();
      scrollTo(0, 800, function () {
        //再回到顶部之后可以在此做操作
      })
    }

    function handleCurrentChange(val) {
      crudContext.queryParam.page = val
      getList();
      scrollTo(0, 800, function () {
        //与上相同
      })
    }

    //移除 批量删除的对象 用于批量删除弹出框
    function removeDeleteArray(row) {
      const index = crudContext.deleteDialog.tableBody.indexOf(row);
      crudContext.deleteDialog.tableBody.splice(index, 1);
    }

    //点击查询按钮
    function handleFilter() {
      //使当前页数为1
      crudContext.queryParam.page = 1;
      //查询列表
      getList()
    }

    //初始化全部查询参数
    function resetQueryParam() {
      //循环所有列
      for (let key in props.scxCrudItems) {
        //如果是查询参数
        if (props.scxCrudItems[key].isFilter) {
          //将 queryParam 里对应的参数设为 null
          crudContext.queryParam.queryObject[props.scxCrudItems[key].prop] = ''
        }
      }
      //进行一次查询
      getList();
    }

    //添加一个 model 到后台
    function createOrUpdateModel() {
      crudContext.editDialog.confirmButtonLoading = true;
      //数据校验
      scxCreateAndUpdateFormRef.value.validate((valid) => {
        //如果所有数据都没有问题
        if (valid) {

          //此处进行拷贝 防止table 中的数据和 temp 产生影响
          let tempData = Object.assign({}, crudContext.temp);
          // crudContext 支持自定义 过滤临时对象的方法 在prop 中设置 customizeTemp 即可
          if (crudConfig.customizeTemp !== null) {
            let ct = crudConfig.customizeTemp(tempData);
            if (ct === -1) {
              crudContext.editDialog.confirmButtonLoading = false;
              return false
            } else {
              tempData = ct;
            }
          }
          //此处设置 id 为空 因为后台使用的 id 为自增 int 类型
          //如果后续后台 id 改为 UUID 此处应该调用 UUID 方法 进行设置
          let createOrUpdateApi;
          let successShowMessage = null;
          if (crudContext.pageFlag.startsWith("create")) {
            tempData.id = null;
            createOrUpdateApi = request.post(crudConfig.createApi, filterModel(tempData))
            successShowMessage = '添加';
          } else {
            createOrUpdateApi = request.put(crudConfig.updateApi, filterModel(tempData))
            successShowMessage = '更新';
          }
          //过滤 Model
          createOrUpdateApi.then(data => {

            if (crudContext.pageFlag === 'create') {
              crudContext.tableBody.unshift(data.items);
              //添加成功  页面总条数添加一条
              crudContext.total = crudContext.total + 1;
            } else if (crudContext.pageFlag === 'update') {
              //修改页面上 id 和 当前修改id 相同的 数据 实现页面的数据刷新
              for (const v of crudContext.tableBody) {
                if (v.id === data.items.id) {
                  //获取要修改的 index 值
                  const index = crudContext.tableBody.indexOf(v);
                  // 用 temp 进行替换
                  crudContext.tableBody.splice(index, 1, data.items);
                  //因为 id 只可能出现一次 所以一旦找到相同的 id 直接 break 即可
                  break
                }
              }
            }

            //关闭添加 弹出框
            crudContext.editDialog.visible = false;

            ElNotification({
              title: successShowMessage + '成功',
              message: '成功' + successShowMessage + ' : ' + crudContext.temp[crudConfig.editShow],
              type: 'success',
              duration: 4000
            })
          })
        } else {
          //校验未通过 先取消确认按钮的loading 状态
          crudContext.editDialog.confirmButtonLoading = false;
          //将焦点定位到 提示错误的 第一项上
          nextTick(() => {
            let isError = document.getElementsByClassName("is-error");
            isError[0].querySelector('input').focus();
          });
          return false;
        }
      });
    }

    //多重组添加方法
    function groupItemAdd(col) {
      let groupItemTemp = {}
      let groupItemIndex = 0;
      if (crudContext.temp[col.prop]) {
        groupItemIndex = crudContext.temp[col.prop].length;
      } else {
        crudContext.temp[col.prop] = [];
      }
      for (let key in col.groupItem) {
        let tableEntity = col.groupItem[key];
        //对校验规则进行设置
        if (tableEntity.rules) {
          crudContext.rules[col.prop + '.' + groupItemIndex + '.' + tableEntity.prop] = [formatRules(tableEntity)]
        }
        groupItemTemp[col.groupItem[key].prop] = '';
      }
      crudContext.temp[col.prop].push(groupItemTemp);
    }

    function groupItemDelete(col, index) {
      crudContext.temp[col.prop].splice(index, 1);
    }

    const getPlaceholder = (col) => col.placeholder || (crudContext.pageFlag === 'create' ? col.createPlaceholder : col.editPlaceholder);

    function checkUnique(rule, value, callback, name) {
      if (value === '' || value === undefined) {
        callback(new Error(name + "不能为空"))
      } else {
        let p = {};
        p[rule.field] = value;
        if (crudContext.pageFlag !== 'create') {
          p['id'] = crudContext.temp.id;
        }
        request.post(crudConfig.checkUniqueApi, p).then(res => {
          if (res.isUnique) {
            callback()
          } else {
            callback(new Error(name + '已被占用'))
          }
        });
      }
    }

    //查询列表方法
    function getList() {
      //开启表格加载动画
      crudContext.tableLoading = true;
      //获取实际能够查询的最大页数
      const maxPageSize = Math.ceil(crudContext.total / crudContext.queryParam.limit);
      //如果查询的页数 大于 实际能够查询的最大页数
      if (crudContext.queryParam.page > maxPageSize) {
        //使页数变为 最大能够查询的页数  也就是最后一页
        crudContext.queryParam.page = maxPageSize;
        //如果页码小于1
        if (crudContext.queryParam.page < 1) {
          //查询第一页
          crudContext.queryParam.page = 1;
          //获取查询的api 传入查询的参数 此处进行参数过滤
        }
        //此处进行关闭
        crudContext.tableLoading = false
      } else {
        if (crudContext.queryParam.page < 1) {
          crudContext.queryParam.page = 1
        }
      }
      let queryParamCopy = JSON.parse(JSON.stringify(crudContext.queryParam));
      for (let key in props.scxCrudItems) {
        if (props.scxCrudItems[key].isFilter && props.scxCrudItems[key].type === 'select' && props.scxCrudItems[key].buildUrl) {
          try {
            let optionArrayName = crudContext.optionArray[props.scxCrudItems[key].prop];
            let optionArrayValue = optionArrayName.find(d => d[props.scxCrudItems[key].labelProp] === queryParamCopy.queryObject[props.scxCrudItems[key].prop]);
            queryParamCopy.queryObject[props.scxCrudItems[key].prop] = optionArrayValue[props.scxCrudItems[key].valueProp];
          } catch (e) {

          }
        }
      }
      queryParamCopy.queryObject = filterParams(queryParamCopy.queryObject);
      if (!crudConfig.hasPagination) {
        queryParamCopy.limit = -1
      }
      request.post(crudConfig.listApi, queryParamCopy).then(response => {
        crudContext.tableBody = response.items;
        crudContext.total = response.total;
        crudContext.tableLoading = false
      });

    }

    async function handleExcelDownload(downloadType) {
      let exportExcelMessage = '';
      let excelFileName = '';
      let nowActiveName = sessionStorage.getItem('defaultActiveName');
      let dataStr = getNowTimeStr();

      let tempList = [];
      if (downloadType === 1) {
        crudContext.handleExcelDownloadNowPageDisabled = true
        exportExcelMessage = '正在导出当前页面数据 , 请耐心等待!!!';
        excelFileName = nowActiveName + '-Excel导出表(当前)-' + dataStr;
        tempList = crudContext.tableBody;
      }
      if (downloadType === 2) {
        crudContext.handleExcelDownloadNowDisabled = true
        exportExcelMessage = '正在导出当前过滤条件数据 , 请耐心等待!!!';
        excelFileName = nowActiveName + '-Excel导出表(过滤条件)-' + dataStr;
        let filteredQueryParam = filterParams(JSON.parse(JSON.stringify(crudContext.queryParam)));
        filteredQueryParam.limit = -1;
        filteredQueryParam.page = 1;
        await request.post(crudConfig.listApi, filteredQueryParam).then(response => {
          tempList = response.items;
        });
      }
      if (downloadType === 3) {
        crudContext.handleExcelDownloadAllDisabled = true
        exportExcelMessage = '正在导出全部数据 , 请耐心等待!!!';
        excelFileName = nowActiveName + '-Excel导出表(全部)-' + dataStr;
        let queryParam = {};
        for (let key in props.scxCrudItems) {
          let tableEntity = props.scxCrudItems[key];
          if (tableEntity.defaultFilterValue) {
            queryParam[tableEntity.prop] = tableEntity.defaultFilterValue
          }
        }
        queryParam.limit = -1;
        queryParam.page = 1;
        await request.post(crudConfig.listApi, queryParam).then(response => {
          tempList = response.items;
        });
      }

      const _notify = ElNotification({
        title: '操作正在进行中...',
        message: h('div', {style: 'width:240px'}, [
          h('i', {style: "font-size:26px", class: "el-icon-loading"}),
          h('span', {}, exportExcelMessage)
        ]),
        type: 'success',
        dangerouslyUseHTMLString: true,
        duration: 0
      });

      let tHeader = [];
      let tempFilter = props.scxCrudItems.filter(col => !col.noShowInTable && col.type !== 'html')
      tempFilter.unshift({label: '序号', prop: '序号'})
      for (let key in tempFilter) {
        let tableEntity = tempFilter[key];
        tHeader.push((tableEntity.label || t(crudConfig.modelName + '.' + tableEntity.prop)));
      }
      //添加序号
      for (let i = 0; i < tempList.length; i++) {
        tempList[i]['序号'] = i + 1;
      }
      const data = formatJson(tempFilter, tempList)
      await exportJsonToExcel({
        header: tHeader,
        data,
        filename: excelFileName,
        autoWidth: true,
        bookType: 'xlsx'
      });
      _notify.close();
      if (downloadType === 1) {
        crudContext.handleExcelDownloadNowPageDisabled = false
        ElMessage({
          showClose: true,
          message: 'Excel 导出(当前) 已完成!!! 请保存!!!',
          type: 'success'
        });
      }
      if (downloadType === 2) {
        crudContext.handleExcelDownloadNowDisabled = false
        ElMessage({
          showClose: true,
          message: 'Excel 导出(当前过滤条件) 已完成!!! 请保存!!!',
          type: 'success'
        });
      }
      if (downloadType === 3) {
        crudContext.handleExcelDownloadAllDisabled = false
        ElMessage({
          showClose: true,
          message: 'Excel 导出(全部) 已完成!!! 请保存!!!',
          type: 'success'
        });
      }
    }

    function formatRules(modelName, routerCol) {
      let tempRules = {};
      // 校验的 flag 比如密码 在创建的时候需要校验
      // 但是修改的时候就不需要校验 就设置为 checkFlag:['create'] 即可
      const checkFlag = routerCol.rules.checkFlag;
      if (!checkFlag || checkFlag.includes(crudContext.pageFlag)) {
        const colName = (routerCol.label || t(modelName + '.' + routerCol.prop));
        tempRules.trigger = routerCol.rules.trigger || 'blur';
        if (routerCol.rules.validator) {
          tempRules.validator = routerCol.rules.validator;
          tempRules.required = true
        } else if (routerCol.rules.isUnique) {
          tempRules.validator = (a, b, c) => checkUnique(a, b, c, colName)
          tempRules.required = true
          tempRules.trigger = 'blur';
        } else {
          tempRules.message = colName + '不能为空';
          tempRules.required = routerCol.rules.required === undefined || routerCol.rules.required;
        }
      }
      return tempRules;
    }

    //根据url 获取下拉选数据 没有分页限制
    function getOptionByBuildUrl(selectUrl) {
      //此处设置 limit 为 -1 即可去除分页限制 (后台做的判断)
      return request.post(selectUrl, {limit: -1, orderBy: "id", page: 1, sort: "desc"})
    }

    function formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        const value = v[j.prop];
        if (j.excelFormat) {
          return j.excelFormat(v)
        } else if (j.type === 'switch') {
          return filterSwitch(value)
        } else if (j.type === 'region') {
          return filterRegion(value)
        } else if (j.type === 'select') {
          return filterSelect(j, value, crudContext.optionArray[j.prop])
        } else {
          return value
        }
      }))
    }

    function filterParams(obj) {
      let _newPar = {};
      //进行循环对象所有属性
      for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        //如果对象属性的值不为空，就保存该属性（如果属性的值全部是空格，属于为空。）
        if (strIsNotBlank(obj[key])) {
          //将不为空的属性放入新对象
          if (Array.isArray(obj[key])) {
            //如果是一个数组对象那么就不进行转义
            if (Object.prototype.toString.call(obj[key][0]) === '[object Object]') {
              _newPar[key] = obj[key];
            } else {
              _newPar[key] = arrayToStr(obj[key])
            }
          } else {
            _newPar[key] = obj[key];
          }
        }
      }
      //返回过滤后的查询对象
      return _newPar;
    }


//将 Model 中的所有 数组属性 转换为以 ',' 分割的字符串 方便后台存储
    function filterModel(obj) {
      let _newPar = {};
      for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        if (Array.isArray(obj[key])) {
          //如果是一个数组对象那么就不进行转义
          if (Object.prototype.toString.call(obj[key][0]) === '[object Object]') {
            _newPar[key] = obj[key];
          } else {
            _newPar[key] = arrayToStr(obj[key])
          }
        } else {
          _newPar[key] = obj[key];
        }
      }
      //返回对象
      return _newPar;
    }

    //绑定键盘事件
    function bindingKeyboard(e) {
      if (crudConfig.hasShortcutKeys) {
        //按键盘方向左键
        if (e.key === 'ArrowLeft' && !crudContext.loading) {
          //如果页面没有加载完 禁止下一页 防止向服务器发送过多请求
          previousPage();
        }
        //按键盘方向右键
        if (e.key === 'ArrowRight' && !crudContext.loading) {
          nextPage();
        }
        //按键盘 delete 并且 批量删除框没有在页面中显示
        if (e.key === 'Delete' && !crudContext.deleteDialog.visible) {
          deleteByKeyBoard();
        }
        //按键盘 回车 目前用来实现 批量删除框的确认 (要求 批量删除框必须已经显示在页面中 并且要删除数据 不能为空)
        if (e.key === 'Enter' && crudContext.deleteDialog.visible && crudContext.deleteDialog.tableBody.length !== 0) {
          batchDeleteModel(true)
        }
        //按键盘 组合按键 alt + 'A'或'a' 目前用来实现当前页面 全选 (目前仅用于 批量删除)
        if (e.altKey && (e.key === 'a' || e.key === 'A')) {
          scxTableRef.value.selectAll()
        }
      }
    }

    //设置 键盘的监听案件 (快捷键 !!!) 包括 键盘方向 键左右 翻页绑定
    onMounted(() => window.addEventListener('keyup', bindingKeyboard));
    //销毁所有 键盘事件 防止重复请求
    onUnmounted(() => window.removeEventListener('keyup', bindingKeyboard));

    provide('crudContext', crudContext)

    return {
      scxCreateAndUpdateFormRef,
      scxTableRef,
      crudConfig,
      addButtons,
      editButtons,
      crudContext,
      getList,
      handleDelete,
      handleUpdate,
      nextPage,
      previousPage,
      createOrUpdateModel,
      handleFilter,
      resetQueryParam,
      getPlaceholder,
      handleSizeChange,
      handleCurrentChange,
      sortByProp,
      batchDeleteModel,
      removeDeleteArray,
      groupItemAdd,
      groupItemDelete,
      revokeDelete,
      t
    }
  }
}
</script>
