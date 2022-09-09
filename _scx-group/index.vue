<template>
  <div class="scx-group">
    <slot name="before"></slot>
    <transition-group name="scx-group-list" @before-leave="fixedElement">
      <div v-for="(item,i) in list" :key="item" class="scx-group-item">
        <slot :index="i" :item="item"></slot>
        <div class="scx-group-item-operation">
          <div v-if="showMoveUp(i)" class="scx-group-item-move-up-button" @click="groupItemMoveUp(i)">
            <slot name="moveUpButton">
              <button class="placeholder-button" type="button">↑</button>
            </slot>
          </div>
          <div v-if="showMoveDown(i)" class="scx-group-item-move-down-button" @click="groupItemMoveDown(i)">
            <slot name="moveDownButton">
              <button class="placeholder-button" type="button">↓</button>
            </slot>
          </div>
          <div v-if="showRemoveButton" class="scx-group-item-remove-button" @click="groupItemRemove(i)">
            <slot name="removeButton">
              <button class="placeholder-button" type="button">X</button>
            </slot>
          </div>
        </div>
      </div>
    </transition-group>
    <slot name="after"></slot>
  </div>
</template>

<script>
import './index.css'
import {computed} from "vue";
import {fixedElement} from "../thirdparty-vue-transition.js";
import {moveDownByIndex, moveUpByIndex, removeByIndex} from "../vanilla-array-utils.js";

export default {
  name: "scx-group",
  props: {
    modelValue: {
      type: Array,
      required: true,
      default: [],
    },
    beforeRemove: {
      type: Function,
      default: null
    },
    beforeMoveUp: {
      type: Function,
      default: null
    },
    beforeMoveDown: {
      type: Function,
      default: null
    },
    loop: {
      type: Boolean,
      default: true
    },
    showRemoveButton: {
      type: Boolean,
      default: true
    },
    showMoveButton: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {

    if (!props.modelValue) {
      ctx.emit("update:modelValue", []);
    }

    const list = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        ctx.emit("update:modelValue", value);
      }
    })

    async function groupItemRemove(index) {
      if (props.beforeRemove) {
        //如果返回值是 false 则不添加
        const result = await props.beforeRemove(list.value[index]);
        if (!result) {
          return;
        }
      }
      list.value = removeByIndex(list.value, index);
    }

    async function groupItemMoveUp(index) {
      if (props.beforeMoveUp) {
        //如果返回值是 false 则不添加
        const result = await props.beforeMoveUp(index);
        if (!result) {
          return;
        }
      }
      list.value = moveUpByIndex(list.value, index, props.loop);
    }

    async function groupItemMoveDown(index) {
      if (props.beforeMoveDown) {
        //如果返回值是 false 则不添加
        const result = await props.beforeMoveDown(index);
        if (!result) {
          return;
        }
      }
      list.value = moveDownByIndex(list.value, index, props.loop);
    }

    function showMoveUp(i) {
      if (!props.showMoveButton) {
        return false;
      }
      const minIndex = 0;
      //数据量小的时候没必要显示
      if (list.value.length <= 2 && i === minIndex) {
        return false;
      } else {//数据量大的时候 如果没启用循环 第一项不显示
        return props.loop ? true : i !== minIndex;
      }
    }

    function showMoveDown(i) {
      if (!props.showMoveButton) {
        return false;
      }
      const maxIndex = list.value.length - 1;
      //数据量小的时候没必要显示
      if (list.value.length <= 2 && i === maxIndex) {
        return false;
      } else { //数据量大的时候 如果没启用循环 最后一项不显示
        return props.loop ? true : i !== maxIndex;
      }
    }

    return {
      list,
      groupItemRemove,
      fixedElement,
      groupItemMoveUp,
      groupItemMoveDown,
      showMoveUp,
      showMoveDown
    }
  }
}
</script>