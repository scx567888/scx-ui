<template>
  <button :class="{'scx-switch-checked': modelValue}" class="scx-switch" @click="changeSwitchState"/>
</template>
<script>
import "./index.css"

export default {
  name: 'scx-switch',
  props: {
    modelValue: Boolean,
    default: false
  },
  setup(props, context) {
    const changeSwitchState = () => context.emit('update:modelValue', !props.modelValue);
    return {changeSwitchState}
  }
}
</script>