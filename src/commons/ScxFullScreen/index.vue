<template>
  <div @click="screenFullClick">
    <scx-icon :icon="isFullscreen?'exit-fullscreen':'fullscreen'"/>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref} from 'vue'
import screenfull from 'screenfull'

export default {
  name: "scx-fullscreen",
  setup() {

    const isFullscreen = ref(false);

    const screenFullClick = () => {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '您的浏览器不支持此功能!!! 请按F11实现全屏',
          type: 'warning'
        });
        return false
      }
      screenfull.toggle()
    }

    const screenFullChange = () => isFullscreen.value = screenfull.isFullscreen

    onMounted(() => {
      if (screenfull.isEnabled) {
        screenfull.on('change', screenFullChange)
      }
    })

    onUnmounted(() => {
      if (screenfull.isEnabled) {
        screenfull.off('change', screenFullChange)
      }
    })

    return {screenFullClick, isFullscreen}
  }
}
</script>
