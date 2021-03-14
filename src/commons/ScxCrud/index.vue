<template>
  <div class="scx-crud">
    <scx-crud-header/>
    <scx-crud-main/>
    <scx-crud-footer/>
    <scx-crud-edit-dialog/>
    <scx-crud-delete-dialog/>
    <scx-crud-import-dialog/>
    <el-backtop target=".scx-main-content"/>
  </div>
</template>

<script>
import "./index.css";
import {onMounted, onUnmounted, provide} from "vue";
import ScxCrudHeader from './module/ScxCrudHeader.vue'
import ScxCrudMain from './module/ScxCrudMain.vue'
import ScxCrudFooter from './module/ScxCrudFooter.vue'
import ScxCrudEditDialog from './module/ScxCrudEditDialog.vue'
import ScxCrudDeleteDialog from './module/ScxCrudDeleteDialog.vue'
import ScxCrudImportDialog from './module/ScxCrudImportDialog.vue'
import {initCrudContext} from "./init/initCrudContext";
import {initCrudEventBus} from "./init/initCrudEventBus";

export default {
  name: 'scx-crud',
  components: {
    ScxCrudHeader,
    ScxCrudMain,
    ScxCrudFooter,
    ScxCrudEditDialog,
    ScxCrudDeleteDialog,
    ScxCrudImportDialog
  },
  props: {
    scxCrudConfig: {
      type: Object,
      required: true,
      default: () => {}
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
    }
  },
  setup(props) {
    //初始化整个 crudContext 的上下文对象 及当前组件的事件总线
    const crudContext = initCrudContext(props);
    const crudEventBus = initCrudEventBus(crudContext);

    //注册到当前组件实例中供子组件使用
    provide('crudContext', crudContext);
    provide('crudEventBus', crudEventBus);

    //设置 键盘的监听案件 (快捷键 !!!) 包括 键盘方向 键左右 翻页绑定
    onMounted(() => window.addEventListener('keyup', crudEventBus.bindingKeyboard));
    //销毁所有 键盘事件 防止影响其他组件
    onUnmounted(() => window.removeEventListener('keyup', crudEventBus.bindingKeyboard));

    return {}
  }
}
</script>
