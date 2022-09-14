class WebSocketHelper {

    LOVE = "❤";// 心跳检测字符
    webSocketURL;// 连接url 需要从外部传过来
    FAILED_SEND_EVENT_LIST = [];// 因连接状态发送失败的请求 都会以方法的形式被存储到这里 待到下一次连接成功时 全部发送给服务器
    WEB_SOCKET = null;// 连接对象
    lockReconnect = false;// 防止重复触发重连方法的锁
    startLoveInterval = null;// 心跳检测定时器

    /**
     *
     * @param {string | URL} webSocketURL
     */
    constructor(webSocketURL) {
        this.webSocketURL = webSocketURL
    }

    onmessage(data) {
        console.log(data)
    }

    //创建连接方法
    createWebSocket() {
        try {
            //创建连接
            this.WEB_SOCKET = new WebSocket(this.webSocketURL);
            //连接成功事件
            this.WEB_SOCKET.onopen = (event) => {
                console.log(`%c WebSocket 连接成功... ${new Date()} `, 'background: #222; color: #bada55');
                this.startLove();
                this.retryFailedSendEvent();
            };
            //消息发送事件
            this.WEB_SOCKET.onmessage = (event) => {
                //心跳检测
                if (event.data === this.LOVE) {
                    console.log(`%c WebSocket 心跳检测成功...  ${new Date()} `, 'background: #222; color: #2196f3');
                    return;
                }
                this.onmessage(event.data);
            }
            //关闭事件
            this.WEB_SOCKET.onclose = () => {
                this.clearStartLove();
                this.reconnect();
            };
            //连接异常事件
            this.WEB_SOCKET.onerror = () => {
                this.clearStartLove();
                this.reconnect();
            };
        } catch (e) {
            this.clearStartLove();
            this.reconnect();
        }
    }

    //重连方法
    reconnect() {
        if (!this.lockReconnect) {
            console.warn("WebSocket 重连中... ", new Date());
            this.lockReconnect = true;
            setTimeout(() => {     //没连接上会一直重连，设置延迟为5000毫秒避免请求过多
                this.lockReconnect = false;
                this.createWebSocket();
            }, 5000);
        }
    }

    //发送消息
    send(json) {
        const jsonStr = JSON.stringify(json);
        try {
            this.WEB_SOCKET.send(jsonStr);
        } catch (e) {
            this.FAILED_SEND_EVENT_LIST.push(() => this.WEB_SOCKET.send(jsonStr))
        }
    }

    //心跳检测 默认一分钟发一次
    startLove() {
        this.startLoveInterval = setInterval(() => this.WEB_SOCKET.send(this.LOVE), 1000 * 60 * 5);
    }

    //重试发送错误的请求
    retryFailedSendEvent() {
        for (let f of this.FAILED_SEND_EVENT_LIST) {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }
        //清空数组中所有事件
        this.FAILED_SEND_EVENT_LIST.splice(0, this.FAILED_SEND_EVENT_LIST.length);
    }

    //清理心跳检测定时器
    clearStartLove() {
        if (this.startLoveInterval != null) {
            clearInterval(this.startLoveInterval)
        }
    }

}

export {WebSocketHelper}