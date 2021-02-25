import scxConfig from "../../scx.config.js";
import {ElMessage, ElNotification} from "element-plus";
import {ref, watch} from "vue";
import {getNowTimeStr, getUUID} from "./index";
import {getToken} from "./permUtil";

let webSocket = null;
const isOpened = ref(0);

const callBackList = {}

watch(isOpened, (newVal) => {
    if (newVal === 1) {
        ElMessage.success("连接成功");
        console.log("连接成功");
        //尝试 将此 websocket 进行认证
        sendMessage({type: "login", token: getToken()}, (e) => {
            console.log(e)
            ElMessage.success("欢迎回来 "+e.message.nickName+" !!!");
        })
    } else {
        ElMessage.error("连接关闭");
        console.log("连接关闭");
    }
})

function createWebSocket() {
    const url = 'ws://' + scxConfig.baseApi.split("//")[1] + '/notice';
    try {
        webSocket = new WebSocket(url);
        webSocket.onopen = () => {
            isOpened.value = 1;
        };
        webSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            try{
                callBackList[message.callBackId](message);
            }catch (e){

            }


            delete callBackList[message.id];
            showWebSocketMessage(event.data);
        }
        webSocket.onclose = () => {
            isOpened.value = 2;
            reconnect()
        };
        webSocket.onerror = () => {
            isOpened.value = 2;
            reconnect()
        };
    } catch (e) {
        reconnect(url);
    }
    return webSocket;
}

//todo 此处需要验证参数 如必须填写发送人id 等
function sendMessage(message, callback) {
    const callBackId = getUUID();
    callBackList[callBackId] = callback;
    message.callBackId = callBackId
    webSocket.send(JSON.stringify(message));
}

function showWebSocketMessage(message) {
    alert(message)
    // ElNotification({
    //     title: message.title,
    //     message: h('div', {
    //         domProps: {
    //             innerHTML: message.content
    //         }
    //     }),
    //     type: 'success',
    //     duration: 0
    // })
}

let lockReconnect = false;

function reconnect() {
    if (!lockReconnect) {
        console.log("WebSocket 重连中....", getNowTimeStr());
        lockReconnect = true;
        setTimeout(() => {     //没连接上会一直重连，设置延迟为2000毫秒避免请求过多
            createWebSocket();
            lockReconnect = false;
        }, 2000);
    }
}

export {
    createWebSocket,
    sendMessage
}