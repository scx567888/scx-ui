<template>
  <div>
    <h1>首页</h1>
    消息
    <textarea v-model="message"/>
    发送的用户
    <select v-model="selectUser" style="width: 100px">
      <option v-for="a in allOnlineUser" :value="a">{{ a }}</option>
    </select>
    <button @click="sendData">发送信息</button>
  </div>

</template>

<script>

import {sendMessage} from "../../utils/webSocketUtil";
import {ref} from "vue";
import request from "../../utils/request";

export default {
  name: 'Dashboard',
  setup() {

    const allOnlineUser = ref([]);
    const selectUser = ref({});

    const message = ref("");

    function getAllOnlineUser() {
      request.post("/api/notice/getAllOnlineUser").then(res => {
        console.log(res)
        allOnlineUser.value=res.onlineUserList;
      })
    }
    getAllOnlineUser();

    function sendData() {
      var param = {
        type:"sendMessage",
        sendType:"",
        username: selectUser.value,
        message: message
      };
      sendMessage(param, (res) => {
        console.log(res)
      });
    }

    return {
      message,
      sendData,
      selectUser,
      allOnlineUser
    }
  }
}

</script>

<style lang="css" scoped>

</style>
