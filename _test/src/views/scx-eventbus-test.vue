<template>
    <div style="padding: 10px">
        在这里写点数据吧 当前时间 :{{ nowTime }}
        <br>
        <textarea v-model="imInput" style="width: 300px;height: 200px"/>
        <br>
        这里会通过 websocket 写入
        <br>
        <textarea v-model="imInput2" style="width: 300px;height: 200px"/>
        <br>
        <button type="button" @click="send">发送</button>
        <br>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {ScxClusteredEventBus} from "../../../index.js";

export default {
    name: "scx-eventbus-test",
    setup() {
        const scxEventBus = new ScxClusteredEventBus("http://127.0.0.1:8080/");

        scxEventBus.connect();

        const imInput = ref("");
        const imInput2 = ref("");
        const nowTime = ref("");

        function send() {
            //先清空
            imInput2.value = "";
            //在本地发送
            scxEventBus.publish("showMessage", imInput.value);
            //向后台发送
            scxEventBus.clusteredPublish("sendMessage", imInput.value);
        }

        //防止页面刷新变化 所以每次都重新注册
        onMounted(() => {
            //这里不用担心事件重复注册 , scxEventBus 会自动进行处理
            //注册一个本地事件
            scxEventBus.addHandler("showMessage", (message) => {
                console.log("这是本地的事件 : " + message);
            });

            //注册一个 websocket 的事件
            scxEventBus.addClusteredHandler("writeMessage", (message) => {
                imInput2.value = imInput2.value + message;
            });

            //注册一个 websocket 的事件
            scxEventBus.addClusteredHandler("writeTime", (message) => {
                nowTime.value = message;
            });

        });

        return {
            imInput,
            imInput2,
            nowTime,
            send,
        };

    }
};
</script>

<style scoped>

</style>
