<template>
  <transition name="scx-zoom-in-top">
    <ul v-show="showContextMenu" ref="scxContextMenuRef" class="scx-contextmenu" @contextmenu.prevent="">
      <li v-for="item in itemList.filter(i=>!i.hidden)" @click="item.callback?item.callback():null">
        <label>
          <input v-if="configs&&configs.type==='checkbox'" v-model="configs.checkboxModel" :value="item.prop"
                 type="checkbox"/>
          {{ item.label }}
        </label>
      </li>
    </ul>
  </transition>
</template>

<script>
import {onMounted, ref} from 'vue'
import './index.css'

export default {
  name: "scx-context-menu",
  props: {
    x: Number,
    y: Number,
    itemList: Array,
    configs: Object
  },
  setup(props, context) {
    const scxContextMenuRef = ref(null)
    const showContextMenu = ref(false)

    onMounted(() => {
      scxContextMenuRef.value.style.top = props.y + 'px';
      scxContextMenuRef.value.style.left = props.x + 'px';
      showContextMenu.value = true
    })
    return {scxContextMenuRef, showContextMenu}
  }

}
</script>