<template>
  <transition name="scx-width-compress">
    <div v-if="layoutMode!=='horizontal'" :class="{hideSidebar}" class="scx-sidebar-vertical">
      <transition name="scx-height-compress">
        <scx-logo v-if="showLogo"></scx-logo>
      </transition>

      <div class="sidebar-vertical-container">
        <el-menu :collapse="hideSidebar"
                 :collapse-transition="false"
                 :default-active="activeMenu"
                 @select="gotoView">
          <menu-item v-for="route in permission_routes" :base-path="route.path" :item="route"/>
        </el-menu>
      </div>
    </div>
  </transition>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import MenuItem from '../MenuItem.vue'
import {reloadAppMain, state} from "../../../store";
import {computed} from "vue";
import './index.css';

export default {
  name: 'vertical-menu',
  components: {MenuItem},
  setup() {
    const router = useRouter();
    const route = useRoute();


    const layoutMode = computed(() => state.setting.layoutMode)
    const permission_routes = computed(() => {
      if (state.setting.layoutMode === 'split') {
        return state.permission.routes.map(d => {
          delete d.children;
          d.alwaysShow = false;
          return d;
        })
      } else {
        return state.permission.routes
      }
    });

    const activeMenu = computed(() => {
      const {meta, path} = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    });
    const showLogo = computed(() => state.setting.sidebarLogo)

    const hideSidebar = computed(() => !state.setting.sidebarStatus)

    function gotoView(key) {
      if (route.path === key) {
        reloadAppMain();
      } else {
        router.push({path: key})
      }
    }


    return {
      layoutMode,
      permission_routes,
      activeMenu,
      showLogo,
      hideSidebar,
      gotoView
    }
  }
}
</script>