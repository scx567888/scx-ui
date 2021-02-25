<template>
  <router-view/>
</template>
<script>
import {changeSetting, state} from "./store";
import {createWebSocket} from "./utils/webSocketUtil";
import {onMounted} from "vue";
import scxConfig from "../scx.config";
import {openWatermark} from "./utils/watermarkUtil";

export default {
  name: 'App',
  setup() {
    //创建网络连接
    createWebSocket();
    //对主题进行设置
    changeSetting('theme', state.setting.theme);
    changeSetting('lowSpecialEffect', state.setting.lowSpecialEffect);
    onMounted(() => {
      if (scxConfig.waterMark.open) {
        openWatermark();
      }
    })
  }
}
</script>
