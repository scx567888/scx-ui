<template>
  <div style="display: flex;padding: 10px">
    <div v-contextmenu="options1" style="height: 200px;width: 200px;background: #3a8ee6;margin-right: 20px">
      {{ message1 }}
      <input v-model="testValue"/>
    </div>
    <div style="height: 200px;width: 200px;background: #5faa62;margin-right: 20px">
      <div v-for="i in 3" style="height: 50px;width: 100%;background: #a2743c;margin-bottom: 5px"
           @contextmenu.prevent="(e)=>showContextMenu1(e,i)">
        {{ i }}
      </div>
      右键点黄色块
    </div>
  </div>
</template>

<script>
import {h, ref} from "vue";
import {showContextMenu} from "../../../index.js";

export default {
  name: "scx-contextmenu-test",
  setup() {
    const message1 = ref("右键点我");
    const testValue = ref('');


    const options1 = [
      {
        label: "选项1",
        callback: () => {
          message1.value = "选项1"
        }
      },
      {
        label: "选项2",
        callback: () => {
          message1.value = "选项2"
        }
      },
      {
        label: "选项3 (点击会关闭菜单)",
        callback: (c) => {
          message1.value = "选项3"
          c();
        }
      },
      {
        label: () => h('input', {
          value: testValue.value,
          'onInput': e => testValue.value = e.target.value
        }),
        callback: () => {

        }
      },
    ]


    function showContextMenu1(e, item) {
      showContextMenu(e, [
        {
          label: '点击的是第' + item + '个',
          callback: (c) => {
            c();
          }
        },
        {
          label: '点击的是第' + item + '个',
          callback: (c) => {
            c();
          }
        },
      ]);
    }

    return {options1, message1, testValue, showContextMenu1}
  }
}
</script>

<style scoped>

</style>