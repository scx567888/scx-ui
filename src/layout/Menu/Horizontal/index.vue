<template>
  <div class="scx-sidebar-horizontal">
    <transition name="scx-width-compress">
      <scx-logo v-if="showLogo&&layoutMode!=='split'" style="width: 200px;box-shadow: unset"/>
    </transition>
    <div ref="sidebarHorizontalDivRef" class="sidebar-horizontal-div"
         @wheel.prevent="sidebarHorizontalScroll">
      <el-menu :default-active="activeMenu"
               mode="horizontal"
               @select="gotoView">
        <menu-item v-for="route in permission_routes" :base-path="route.path" :item="route"/>
      </el-menu>
    </div>
  </div>

</template>

<script>
import {state} from "/@/store";
import MenuItem from '../MenuItem.vue'
import {computed, ref} from "vue";
import {reloadAppMain} from "../../../store";
import {useRoute, useRouter} from "vue-router";
import './index.css';

export default {
  name:'horizontal-menu',
  components: {MenuItem},
  setup() {
    const sidebarHorizontalDivRef = ref(null);
    const layoutMode = computed(() => state.setting.layoutMode);

    const router = useRouter();
    const route = useRoute();

    const permission_routes = computed(() => state.permission.routes);

    function gotoView(key) {
      if (route.path === key) {
        reloadAppMain();
      } else {
        router.push({path: key})
      }
    }

    const activeMenu = computed(() => {
      const {meta, path} = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    });

    const showLogo = computed(() => state.setting.sidebarLogo);

    function sidebarHorizontalScroll(e) {
      const scrollWrapper = sidebarHorizontalDivRef.value
      scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + e.wheelDelta * 2
    }

    return {
      sidebarHorizontalDivRef,
      permission_routes,
      gotoView,
      sidebarHorizontalScroll,
      showLogo,
      activeMenu,
      layoutMode
    }
  }
}
</script>
