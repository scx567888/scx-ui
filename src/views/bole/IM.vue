<template>
  <div class="im-div">
    <div class="im-left-div">
      <div>
        <scx-icon type="outlined" icon="comment"/>
        <scx-icon type="outlined" icon="team"/>
      </div>
      <div>
        <scx-icon type="outlined" icon="ellipsis"/>
      </div>

    </div>
    <div class="im-center-div"></div>
    <div class="im-right-div">
      <div class="im-content">
        <ul v-for="item in imHistory">
          你好
        </ul>
      </div>
      <div class="im-input">
        <textarea v-model="imInput"/>
        <el-button type="success" @click="send">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"
import {sendMessage} from "../../utils/webSocketUtil"

export default {
  name: "index",
  setup() {
    const imInput = ref("");
    const imHistory = ref([]);


    function send() {
      sendMessage(imInput.value);
    }

    return {imInput, imHistory, send}
  }
}
</script>

<style>
.im-div {
  display: flex;
  width: 100%;
  height: 100%;
}

.im-left-div .scx-icon {
  fill: #8e8e84;
  height: 30px;
  width: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.im-left-div .scx-icon:hover {
  fill: #ffffff;
}

.im-left-div {
  width: 60px;
  background: #0a0e14;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.im-left-div:nth-child(1) > div {
  display: flex;
  flex-direction: column;
}

.im-center-div {
  width: 350px;
  background: #e0dada;
  flex-shrink: 0;
}

.im-right-div {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.im-content {
  height: 100%;
  background: #4a5562;
}

.im-input {
  height: 300px;
}

.im-input > textarea {
  height: 200px;
  width: 100%;
  overflow: hidden;
  resize: none;
  box-sizing: border-box;
}

</style>