<template>
  <div class="scx-table-loading">
    <div class="loading-bg">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import "./index.css"

export default {
  name: "scx-loading",
  props: {
    showBg: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const showBg = computed(() => props.showBg)
    return {showBg}
  }
}
</script>