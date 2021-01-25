<template>
  <div class="scx-progress">
    <div class="scx-progress-line">
      <div class="scx-progress-bg">
        <div :class="progressColor" :style="'width:'+progressValue+'%'"
             class="scx-progress-content">
        </div>
      </div>
    </div>
    <span class="scx-progress-text">
            {{ progressValue }}%
      </span>
  </div>
</template>

<script>
import {computed} from 'vue'
import './index.css'

export default {
  name: "scx-progress",
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const progressValue = computed(() => props.modelValue);
    const progressColor = computed(() => {
      if (props.modelValue <= 20) {
        return 'progress-color-yellow'
      }
      if (props.modelValue > 20 && props.modelValue <= 40) {
        return 'progress-color-red'
      }
      if (props.modelValue > 40 && props.modelValue <= 60) {
        return 'progress-color-purple'
      }
      if (props.modelValue > 60 && props.modelValue <= 80) {
        return 'progress-color-blue'
      }
      return 'progress-color-green'
    });
    return {progressValue, progressColor}
  }
}
</script>