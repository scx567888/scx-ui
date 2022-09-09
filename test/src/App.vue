<template>
  <router-link class="fff" to="/">Home</router-link>
  <router-link class="fff" to="/scx-contextmenu-test">右键菜单测试</router-link>
  <router-link class="fff" to="/scx-drag-test">拖动测试</router-link>
  <router-link class="fff" to="/scx-eventbus-test">事件总线测试</router-link>
  <router-link class="fff" to="/scx-icon-test">图标测试</router-link>
  <router-link class="fff" to="/scx-xlsx-test">XLSX导出测试</router-link>
  <router-link class="fff" to="/scx-crud-test">ScxCrud测试</router-link>
  <router-link class="fff" to="/scx-group-test">ScxGroup测试</router-link>
  <router-link class="fff" to="/list-to-tree-test">ListToTree测试</router-link>
  <router-link class="fff" to="/scx-upload-test">ScxUpload 测试</router-link>
  <router-link class="fff" to="/scx-upload-list-test">ScxUploadList 测试</router-link>
  <router-link class="fff" to="/scx-loading-test">ScxLoading 测试</router-link>
  <button @click="f1">点击切换主题</button>
  <router-view/>
</template>

<script>
import {provide, ref} from "vue";
import {scxApiHelper, scxEventBus, scxFSS, scxJsonVoReq, scxReq} from "./_scx/index.js";
import {changeTheme} from "../../_scx-theme/index.js";

export default {
  name: "App",
  setup() {
    provide("scx-api-helper", scxApiHelper);
    provide("scx-req", scxReq);
    provide("scx-json-vo-req", scxJsonVoReq);
    provide("scx-event-bus", scxEventBus);
    provide("scx-fss", scxFSS);
    const b = ref(false);

    function f1() {
      b.value = !b.value;
      changeTheme(b.value);
    }

    return {b, f1}
  }
}
</script>

<style scoped>
.fff {
  color: var(--scx-text-color);
  margin-right: 5px
}
</style>