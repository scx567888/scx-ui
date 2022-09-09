<template>
  <div>
    <div v-for="i in 100" v-drag="getDragEvent(i)" :style="{background:getColor()}" class="scx-drag-test-div">
      {{ i }}
    </div>
  </div>

</template>

<script>
export default {
  name: "scx-drag-test",
  setup() {

    function getDragEvent(i) {
      return {
        onClick: (el) => {
          console.log(i + " : onClick")
        },
        onDrag: (el) => {
          console.log(i + " : onDrag")
        },
        onDragEnd: (el) => {
          console.log(i + " : onDragEnd")
        }
      }
    }

    function getColor() {
      return "#" + Math.random().toString(16).slice(-6);
    }

    return {getColor, getDragEvent}
  }
}
</script>

<style scoped>
.scx-drag-test-div {
  position: fixed;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: move;
  user-select: none;
}
</style>