<template>
  <scx-group v-model="data" :beforeAdd="aaa" :beforeRemove="bbb" :loop="false">
    <template #default="{item,index}">
      <div class="test-input-wrapper">
        姓名
        <input v-model="item.name"/>
        年龄:
        <input v-model="item.age"/>
      </div>
      <h3>子数据</h3>
      <scx-group v-model="item.c">
        <template #default="h">
          <div class="test-input-wrapper">
            B
            <input v-model="h.item.b"/>
            D:
            <input v-model="h.item.d"/>
          </div>
        </template>
        <template #after>
          <button type="button" @click="groupItemAdd2(item.c)">添加一条子级数据</button>
        </template>
      </scx-group>
    </template>
    <template #after>
      <button type="button" @click="groupItemAdd1()">添加一条父级数据</button>
    </template>
  </scx-group>

  <scx-group v-model="data" :beforeAdd="aaa" :beforeRemove="bbb" :loop="false">
    <template #default="{item,index}">
      <div class="test-input-wrapper">
        姓名
        <input v-model="item.name"/>
        年龄:
        <input v-model="item.age"/>
      </div>
      <h3>子数据</h3>
      <scx-group v-model="item.c">
        <template #default="h">
          <div class="test-input-wrapper">
            B
            <input v-model="h.item.b"/>
            D:
            <input v-model="h.item.d"/>
          </div>
        </template>
        <template #after>
          <button type="button" @click="groupItemAdd2(item.c)">添加一条子级数据</button>
        </template>
      </scx-group>
    </template>
    <template #after>
      <button type="button" @click="groupItemAdd1()">添加一条父级数据</button>
    </template>
  </scx-group>
  {{ data }}
</template>

<script setup>
import {ref} from "vue";

const data = ref([{
  name: '', age: '', c: [
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
  ]
}, {
  name: '', age: '', c: [
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
    {b: '', d: ''},
  ]
}]);

function aaa(v) {
  v.name = 11111
  return true
}

function bbb(i) {
  console.log(i)
  alert("删除成功");
  return true
}

function groupItemAdd1() {
  data.value.push({name: '', age: '', c: []})
}

function groupItemAdd2(l) {
  l.push({b: '', d: ''})
}
</script>
<style scoped>
.test-input-wrapper {
  display: flex;
  justify-content: center;
}
</style>