<template>
  <transition name="scx-contextmenu-transition">
    <ul v-show="showContextMenu" ref="scxContextMenuRef" class="scx-contextmenu" @contextmenu.prevent="">
      <li v-for="item in contextMenuItems" @click="callItemCallBack(item)">
        <component :is="getLabel(item)"></component>
      </li>
    </ul>
  </transition>
</template>

<script>
import './index.css'
import {onMounted, ref} from 'vue'
import {closeContextMenu} from "../scx-context-menu.js";

export default {
  name: "scx-context-menu",
  props: {
    x: Number,
    y: Number,
    contextMenuItems: Array
  },
  setup(props, context) {
    const scxContextMenuRef = ref(null);
    const showContextMenu = ref(false);

    const callItemCallBack = (item) => {
      if (item.callback) {
        item.callback(closeContextMenu)
      } else {
        closeContextMenu();
      }
    }

    const getLabel = ({label}) => {
      if (typeof label === 'function') {
        return label;
      } else {
        return () => label;
      }
    }

    onMounted(() => {
      scxContextMenuRef.value.style.top = props.y + 'px';
      scxContextMenuRef.value.style.left = props.x + 'px';
      showContextMenu.value = true
    })

    return {scxContextMenuRef, showContextMenu, callItemCallBack, getLabel}
  }

}
</script>
