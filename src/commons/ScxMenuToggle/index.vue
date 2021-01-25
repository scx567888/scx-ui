<template>
  <div class="hamburger-container" style="padding: 0 15px;" @click="toggleSideBar">
    <scx-icon :class="['hamburger',{isOpened}]" icon="menu-fold" type="outlined"/>
  </div>
</template>

<script>
import {changeSetting, state} from "../../store";
import {computed} from "vue";
import "./index.css"

export default {
  name: "scx-menu-toggle",
  setup() {
    const isOpened = computed(() => state.setting.sidebarStatus)

    const toggleSideBar = () => changeSetting('sidebarStatus', !state.setting.sidebarStatus)

    return {
      isOpened, toggleSideBar
    }

  }
}
</script>
