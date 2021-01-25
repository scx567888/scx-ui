<template>
  <div>
    <h1>首页</h1>
    <button @click="getaaa">获取数据 1 websocket</button>
    <button @click="getbbb">获取数据2 websocket</button>
    <button @click="getaaa1">获取数据1 http</button>
    <button @click="getbbb1">获取数据2 http</button>
    {{ data }}毫秒
  </div>

</template>

<script>

import {sendMessage} from "../../utils/webSocketUtil";
import {ref} from "vue";
import request from "../../utils/request";

export default {
  name: 'Dashboard',
  setup() {
    const data = ref("");

    function getaaa() {
      var param = {method: 'reson:ProjectNoteService.save', params: {entity: {limit:10,page:2,username: "哈哈行昂a!!!"}}};
      var a = new Date();
      sendMessage(param, (res) => {
        data.value = new Date() - a + "";
      });
    }


    function getaaa1() {
      var a = new Date();
      request.post("/api/reson/ProjectNote/list", {}).then((res) => {
            data.value = new Date() - a + "";
          }
      )

    }

    function getbbb() {
      var param = {method: 'ProjectNoteService.getCount', params: {name: "哈哈行昂a!!!"}};
      var a = new Date();
      sendMessage(param, (res) => {
        data.value = new Date() - a + "";
      });
    }

    function getbbb1() {
      var a = new Date();
      request.post("/api/reson/projectNote/count", {}).then((res) => {
            data.value = new Date() - a + "";
          }
      )
    }


    return {
      data,
      getaaa,
      getaaa1,
      getbbb,
      getbbb1
    }
  }
}

</script>

<style lang="css" scoped>

</style>
