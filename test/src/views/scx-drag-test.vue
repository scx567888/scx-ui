<template>
  <div>
    <label>
      显示虚拟边界
      <input v-model="showMargin" type="checkbox">
    </label>
    <label>
      自动归位
      <input v-model="autoBack" type="checkbox">
    </label>

    <div style="display: flex;flex-wrap: wrap">

      <div ref="div2Ref" v-for="i in 100" v-drag="getValue(i)" :style="{background:getColor()}"
           class="scx-drag-test-div2">
        {{ i }}
      </div>

      <div ref="rightRef" class="scx-drag-test-div-wrapper right" :class="{showMargin}">
        <div :style="{background:getColor()}" class="scx-drag-test-div1">
          吸附右侧
        </div>
      </div>

      <div ref="topRef" class="scx-drag-test-div-wrapper top" :class="{showMargin}">
        <div :style="{background:getColor()}" class="scx-drag-test-div1">
          吸附上侧
        </div>
      </div>

      <div ref="leftRef" class="scx-drag-test-div-wrapper left" :class="{showMargin}">
        <div :style="{background:getColor()}" class="scx-drag-test-div1">
          吸附左侧
        </div>
      </div>

      <div ref="bottomRef" class="scx-drag-test-div-wrapper bottom" :class="{showMargin}">
        <div :style="{background:getColor()}" class="scx-drag-test-div1">
          吸附下侧
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useScxDrag} from "../../../_scx-drag/index.js";

const autoBack = ref(false)
const showMargin = ref(false);

const div2Ref = ref();
const rightRef = ref();
const topRef = ref();
const leftRef = ref();
const bottomRef = ref();

function getValue(i) {
  return {
    callback: {
      onClick: (el) => {
        el.style.backgroundColor=getColor();
        console.log(i + " : onClick")
      },
      onDrag: (el) => {
        console.log(i + " : onDrag")
        el.classList.add("transition-none")
      },
      onDragEnd: (el) => {
        if (autoBack.value){
          el.style.transform = "unset"
        }
        console.log(i + " : onDragEnd")
        el.classList.remove("transition-none")
      }
    }
  }
}

function getDragEvent(i) {
  return {
    onClick: (el) => {
      console.log(i + " : onClick")
    },
    onDrag: (el) => {
      el.classList.add("dragging")
      console.log(i + " : onDrag")
    },
    onDragEnd: (el, startMatrix) => {
      console.log(i + " : onDragEnd")
      el.classList.remove("dragging")
      let nowMatrix = new DOMMatrix(window.getComputedStyle(el).transform);
      //清楚我们不需要的坐标
      if (i === "top" || i === "bottom") {
        nowMatrix = nowMatrix.translate(0, -nowMatrix.f)
      } else if (i === "left" || i === "right") {
        nowMatrix = nowMatrix.translate(-nowMatrix.e, 0)
      }
      el.style.transform = nowMatrix.toString()
      el.classList.add("transform-none")
    }
  }
}

function getColor() {
  return "#" + Math.random().toString(16).slice(-6);
}

onMounted(() => {

  watch(autoBack, (v) => {
    if (v) {
      for (let div2RefKey in div2Ref.value) {
        div2Ref.value[div2RefKey].style.transform = "unset"
      }
    }
  }, {immediate: true})


  const getO = (i) => {
    return {
      callback: getDragEvent(i),
      bounds: (a) => {
        if (showMargin.value) {
          a.bottom = a.bottom - 100
          a.top = a.top + 100
          a.left = a.left + 100
          a.right = a.right - 100
        }
        return a;
      }
    }
  }

  useScxDrag(leftRef.value, getO("left"));
  useScxDrag(topRef.value, getO("top"));
  useScxDrag(rightRef.value, getO("right"));
  useScxDrag(bottomRef.value, getO("bottom"));

});

</script>

<style scoped>
.scx-drag-test-div2 {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: move;
  user-select: none;
  transition: all 300ms ease-out;
}

.scx-drag-test-div-wrapper {
  z-index: 1;
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: move;
  user-select: none;
  transition: all 300ms ease-out;
}

.scx-drag-test-div-wrapper.right {
  right: 0px;
  top: 50%;
}

.scx-drag-test-div-wrapper.bottom {
  bottom: 0px;
  left: 50%;
}

.scx-drag-test-div-wrapper.top {
  top: 0px;
  left: 50%;
}

.scx-drag-test-div-wrapper.left {
  left: 0px;
  top: 50%;
}

.transform-none {
  transform: none;
}

.scx-drag-test-div1 {
  z-index: 1;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: move;
  user-select: none;
  transition: all 300ms ease-in;
}

.dragging {
  transition: none;
}

@keyframes r {

  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(0.8);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }

}

.dragging > .scx-drag-test-div1 {
  border-radius: 50%;
  animation: r 300ms linear infinite;
  background: darkmagenta !important;
  border-right-color: #0d6efd;
  border-left-color: #fe0953;
  border-bottom-color: #45fe06;
  border-top-color: #fff700;
  border-width: 4px;
  border-style: solid;
  box-sizing: border-box;
}

.showMargin.right {
  right: 100px;
}

.showMargin.top {
  top: 100px;
}

.showMargin.left {
  left: 100px;
}

.showMargin.bottom {
  bottom: 100px;
}

.transition-none {
  transition-duration: unset;
}
</style>