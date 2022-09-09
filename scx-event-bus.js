class WebSocketHelper {

    LOVE = "❤";// 心跳检测字符
    webSocketURL;// 连接url 需要从外部传过来
    FAILED_SEND_EVENT_LIST = [];// 因连接状态发送失败的请求 都会以方法的形式被存储到这里 待到下一次连接成功时 全部发送给服务器
    WEB_SOCKET = null;// 连接对象
    lockReconnect = false;// 防止重复触发重连方法的锁
    startLoveInterval = null;// 心跳检测定时器

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

//事件总线事件
class EBEvent {
    constructor(name, event, isWSEvent) {
        this.name = name;
        this.event = event;
        this.isWSEvent = isWSEvent;
    }
}

//前后台发送消息 (websocket) 的封装体
class WSBody {
    constructor(name, data) {
        this.name = name;
        this.data = data;
    }
}

class ScxEventBus {
    webSocketHelper;// websocket helper
    eventList = [];// 事件列表

    /**
     *
     * @param scxApiHelper {ScxApiHelper}
     */
    constructor(scxApiHelper) {

        this.webSocketHelper = new WebSocketHelper(scxApiHelper.joinWebSocketURL('/scx'));
        this.webSocketHelper.createWebSocket();

        //监听 websocket 的事件
        this.webSocketHelper.onmessage = (data) => {
            const json = JSON.parse(data);
            const wsBody = new WSBody(json.name, json.data);
            if (wsBody.name) {
                this.findWSEventByName(wsBody.name).forEach(c => c.event(wsBody.data));
            }
        }

    }

    findEventByName(name) {
        return this.eventList.filter(c => c.name === name && c.isWSEvent === false);
    }

    findWSEventByName(name) {
        return this.eventList.filter(c => c.name === name && c.isWSEvent === true);
    }

    //将之前添加的旧事件移除
    removeOldEvent(thisEvent) {
        for (let i = 0; i < this.eventList.length; i++) {
            const v = this.eventList[i];
            if (Object.entries(v).toString() === Object.entries(thisEvent).toString()) {
                this.eventList.splice(i, 1);
                break;
            }
        }
    }

    //添加消费者
    consumer(name, event) {
        const thisEvent = new EBEvent(name, event, false);
        this.removeOldEvent(thisEvent)
        this.eventList.push(thisEvent);
    };

    //添加 websocket 消费者
    wsConsumer(name, event) {
        const thisEvent = new EBEvent(name, event, true);
        this.removeOldEvent(thisEvent)
        this.eventList.push(thisEvent);
    };

    //发送事件
    publish(name, message) {
        this.findEventByName(name).forEach(c => c.event(message));
    };

    //发送事件
    wsPublish(name, message) {
        this.webSocketHelper.send(new WSBody(name, message));
    };
}

export {
    ScxEventBus
}