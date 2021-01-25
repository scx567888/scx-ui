<template>
  <i v-if="icon.includes('el-icon')" :class="icon"/>
  <svg v-else class="scx-icon">
    <use :href="'#scx-icon-' +type+'_'+ icon"/>
  </svg>
</template>
<script>
import './index.css'

export default {
  name: 'scx-icon',
  props: {
    icon: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: 'filled'
    }
  },
  setup(props) {
    return {}
  }
};
</script>