<template>
  <div class="scx-main-navbar">
    <!-- 左边 包括菜单折叠按钮和路由   -->
    <div v-if="layoutMode!=='horizontal'" style="display: flex">
      <scx-menu-toggle/>
      <scx-breadcrumb v-if="layoutMode==='vertical'"/>
    </div>

    <transition name="scx-width-compress">
      <!-- 横向导航栏   -->
      <horizontal-menu v-if="layoutMode!=='vertical'"/>
    </transition>
    <!-- 右边 包括操作项   -->
    <div class="right-item-group">
      <scx-menu-search class="right-item"/>
      <scx-fullscreen class="right-item "/>
      <scx-size-select class="right-item "/>
      <scx-lang-select class="right-item "/>
      <scx-user-avatar class="right-item last-right-item"/>
    </div>
  </div>
</template>

<script>
import {state} from "../../store";
import HorizontalMenu from "../Menu/Horizontal/index.vue";
import {computed} from "vue";

export default {
  components:{
    HorizontalMenu
  },
  setup() {
    const layoutMode = computed(() => state.setting.layoutMode);
    return {layoutMode}
  },
}
</script>
<style>
.scx-main-navbar {
  /*父元素高度不够时不进行收缩*/
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: var(--navbar_bg);
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px;
  z-index: 1;
}

.horizontalMode .scx-main-navbar {
  box-shadow: unset;
}

.scx-main-navbar .scx-icon {
  fill: var(--app_color);
}

.scx-main-navbar .right-item-group {
  height: 100%;
  line-height: 50px;
  display: flex;
  flex-shrink: 0;
}

.scx-main-navbar .right-item-group:focus {
  outline: none;
}

.scx-main-navbar .right-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: var(--app_color);
  vertical-align: text-bottom;
  cursor: pointer;
  transition: background 0.3s;
}

.scx-main-navbar .right-item:hover {
  background: var(--app-hover_bg);
}


.scx-main-navbar .last-right-item {
  margin-right: 8px;
  padding-right: 2px;
}

.scx-main-navbar .last-right-item:hover {
  background: var(--app-hover_bg);
}


.scx-main-navbar .el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>
