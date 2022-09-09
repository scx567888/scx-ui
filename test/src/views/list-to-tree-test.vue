<template>
  <div>
    <h3>列表数据</h3>
    {{ listData }}
    <br>
    <h3>树形数据</h3>
    {{ treeData }}
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {listToTree} from "../../../index.js";

const listData = ref([
  {f: 1},
  {f: 2, d: 1},
  {f: 3, d: 2},
  {f: 4, d: 3},
  {f: 5, d: 2},
  {f: 888, d: 666},
]);

const treeData = computed(() => listToTree(listData.value, {idFieldName: 'f', parentIDFieldName: 'd'}));

</script>

<style scoped>

</style>