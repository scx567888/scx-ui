<template>
  <div>
    <button type="button" @click="exportXLSX()">点击导出</button>
  </div>
</template>

<script>
import {exportExcel} from "../../../index.js";

export default {
  name: "scx-xlsx-test",
  setup() {

    function exportXLSX() {
      const headTranslation = {name: '姓名', idCard: '身份证号码', age: "年龄",};
      const data = [];
      for (let i = 0; i < 999; i++) {
        data.push({name: '张三' + 1, age: i, idCard: "202001999192929" + i})
      }
      exportExcel({headerTranslationMap: headTranslation, listData: data})
    }

    return {
      exportXLSX
    }
  }
}
</script>

<style scoped>

</style>