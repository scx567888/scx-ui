<template>
  <div class="scx-form-design">
    <!-- 组件列表 -->
    <div class="form-assembly scx-card">
      <div v-for='(item,index) in assemblyList' :key="index" class="assembly_item" draggable="true"
           @click="assemblyClick(item)" @dragend="assemblyDragend" @dragstart="assemblyDragstart(item)">
        <scx-icon :icon="item.icon"/>
        {{ item.label }}
      </div>
      <!-- 垃圾桶 -->
      <div v-show="showTrash" class="trash-bg" @dragleave="trashIcon = 'blue'" @dragover="trashIcon = 'red'"
           @drop="trashDrop" @dragover.prevent>
        <scx-icon style="pointer-events: none;" type="color" :icon="'trash-'+trashIcon"/>
      </div>
    </div>

    <!-- 中间主设计页面 -->
    <div class="form-design scx-card">
      <!--  设计页标题头 -->
      <div class="form-design-head" @click="clickForm=true">
        <div>
          <scx-icon icon="setting"/>
          <span style="margin-left: 5px">表单设计</span>
          <el-radio-group v-model="formSetting.labelPosition" size="mini" style="margin-left: 10px;margin-right: 10px">
            <el-radio-button label="left" size="mini">
              <scx-icon icon="keep-left"/>
            </el-radio-button>
            <el-radio-button label="top">
              <scx-icon icon="keep-top"/>
            </el-radio-button>
            <el-radio-button label="right">
              <scx-icon icon="keep-right"/>
            </el-radio-button>
          </el-radio-group>

          <el-input-number v-model="formSetting.labelWidth" :max="200" :min="80" :step="1" size="mini" stepstrictly/>

          <el-radio-group v-model="formSetting.formSize" size="mini" style="margin-left: 10px">
            <el-radio-button label="medium">大</el-radio-button>
            <el-radio-button label="small">中</el-radio-button>
            <el-radio-button label="mini">小</el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <el-button plain size="mini" type="success" @click="save">保存
          </el-button>
          <el-button plain size="mini" type="primary" @click="dialogVisible = true">预览
          </el-button>
        </div>
      </div>
      <!--  设计页背景 -->
      <div class="form-design-body" @dragenter="formDesignDragEnter" @dragleave="formDesignDragLeave" @dragover.prevent>
        <el-form :label-position="formSetting.labelPosition" :label-width="formSetting.labelWidth+'px'"
                 :model="formDesignTemp" :size="formSetting.formSize">
          <transition-group name="flip-list">
            <!-- 所有的占位元素只在从左侧拖到中间的时候显示 -->
            <div v-for="(item,index) in formItemList" :key="item"
                 class="dragDiv formItem" draggable="true" @click="clickFormItem(item)"
                 @dragend="itemDragEnd(item)"
                 @dragenter="itemDragEnter(item)" @dragstart="itemDragStart(item)"
                 @dragover.prevent
                 :style="{border: nowFormItem.prop === item.prop ? '1px solid red' : ''}">
              <el-form-item v-if='!["divider","p"].includes(item.type)'
                            :label="item.label" :prop='item.prop' :rules='item.rules'>
                <scx-easy-item :disabled="item.disabled" :style="{width:'100%'}" :placeholder="item.placeholder"
                               :scx-easy-item-config="item" v-model="formDesignTemp[item.prop]"/>
              </el-form-item>
              <!--  分割线和p标签不需要 左侧 label 所以在此处进行特殊处理 -->
              <el-divider v-if="item.type === 'divider'" :content-position='item.contentposition'>
                {{ item.text }}
              </el-divider>
              <p v-if="item.type === 'p'"
                 :style="{'text-align': item.contentposition,'font-size':item.fontsize+'px',color:item.textcolor}">
                {{ item.text }}</p>
            </div>
          </transition-group>
        </el-form>
      </div>
    </div>
    <scx-form-design-setting v-model="nowFormItem"/>
    <!-- 预览表单   -->
    <el-dialog v-model="dialogVisible" title="预览表单">
      <scx-form-preview :form-item-list="formItemList" :form-setting='formSetting'/>
    </el-dialog>
  </div>
</template>

<script>
//todo 一些事件现在无法正常运行
import {computed, reactive, ref} from "vue";
import "./index.css";
import allAssembly from "./assemblys";
import ScxFormDesignSetting from "./Setting.vue";

export default {
  name: 'scx-form-design',
  components: {ScxFormDesignSetting},
  props: {
    formDesignFormSetting: {
      type: Object,
      default: () => {
      }
    },
    formDesignFormItemList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    // 表单设计的组件列表
    const assemblyList = ref(allAssembly);
    // 拖动状态
    // 没有拖动 null
    // 中间拖动 center
    // 左侧拖动 left
    const dragState = ref(null);
    // 当前被操作的组件
    const nowFormItem = ref({showFrom: []});
    // 表单列表
    const formItemList = ref([]);
    // 表单设置
    const formSetting = reactive({
      labelPosition: 'left',
      labelWidth: 80,
      formSize: 'small'
    });
    // 表单的值
    const formDesignTemp = reactive({});
    const trashIcon = ref('blue');
    const showTrash = computed(() => dragState.value === 'center');
    const dialogVisible = ref(false);
    const clickForm = ref(true);//点击的地方 true 为点击整个表单 false 为点击里面的组件
    new function initFormDesign() {
      formSetting.value = props.formDesignFormSetting
      formItemList.value = props.formDesignFormItemList
      for (let key in props.formDesignFormItemList) {
        let dataEntity = props.formDesignFormItemList[key];
        if (dataEntity.type === 'checkbox') {
          formDesignTemp[dataEntity.prop] = [];
        } else {
          formDesignTemp[dataEntity.prop] = '';
        }
      }
    }

    function assemblyClick(item) {
      const temp = {...item, prop: item.prop + "_" + new Date().getTime()};
      formItemList.value.push(temp);
    }

    function formDesignDragEnter() {
      if (dragState.value === 'left') {
        formItemList.value.unshift({...nowFormItem.value});
        dragState.value = 'center';
      }
    }

    function formDesignDragLeave() {

    }

    // 选中中间的组件
    function clickFormItem(data) {
      clickForm.value = false
      nowFormItem.value = data
    }

    function save() {
      context.emit('save', {formDesignFormSetting: formSetting.value, formDesignFormItemList: formItemList.value})
    }


    //左侧设计器开始拖动
    function assemblyDragstart(item) {
      dragState.value = 'left'
      nowFormItem.value = {...item, prop: item.prop + "_" + new Date().getTime()};
    }

    function assemblyDragend() {
      dragState.value = 'null';
    }

    const oldItem = ref(null);
    const newItem = ref(null);

    function trashDrop() {
      formItemList.value = formItemList.value.filter(item => item !== oldItem.value);
      dragState.value = 'null';
    }

    // 记录初始信息
    const itemDragStart = (value) => {
      oldItem.value = value;
      dragState.value = 'center';
    };

    // 做最终操作
    const itemDragEnd = (value) => {
      dragState.value = 'null';
    };

    // 记录移动过程中信息
    const itemDragEnter = (value) => {
      if (dragState.value === 'left') {
        // formItemList.value.unshift(nowFormItem.value);
        // dragState.value = 'center'
      } else {
        if (newItem.value !== value) {
          newItem.value = value;
          moveItem();
        }
      }
    }

    const moveItem = () => {
      if (oldItem.value !== newItem.value) {
        const oldIndex = formItemList.value.indexOf(oldItem.value);
        const newIndex = formItemList.value.indexOf(newItem.value);
        const newItems = [...formItemList.value];
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, oldItem.value);
        formItemList.value = [...newItems];
      }
    }

    return {
      formSetting,
      formDesignTemp,
      nowFormItem,
      formItemList,
      dragState,
      showTrash,
      trashIcon,
      assemblyList,
      dialogVisible,
      assemblyClick,
      assemblyDragstart,
      assemblyDragend,
      itemDragEnter,
      clickFormItem,
      save,
      formDesignDragEnter,
      formDesignDragLeave,
      itemDragStart,
      trashDrop,
      itemDragEnd,
    }
  }
}
</script>