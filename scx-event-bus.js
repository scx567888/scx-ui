import {WebSocketHelper} from "./_scx-event-bus/WebSocketHelper.js";
import {WSMessage} from "./_scx-event-bus/WSMessage.js";
import {initBaseURL} from "./_scx-event-bus/ScxEventBusHelper";

class ScxEventBus {
    webSocketHelper;// websocket helper
    events = {};// 事件列表
    wsEvents = {};// ws 事件列表

    /**
     *
     * @param baseURL
     */
    constructor(baseURL) {
        this.webSocketHelper = new WebSocketHelper(new URL('/scx', initBaseURL(baseURL)));

        //监听 websocket 的事件
        this.webSocketHelper.onmessage = (data) => {
            const json = JSON.parse(data);
            const wsMessage = new WSMessage(json.address, json.body, json.headers);
            if (wsMessage.address) {
                const es = this.wsEvents[wsMessage.address];
                if (es) {
                    for (const c of es) {
                        try {
                            c(wsMessage.body)
                        } catch (e) {
                            console.warn(e)
                        }
                    }
                }
            }
        }
    }

    /**
     * 手动启动连接
     */
    startConnection() {
        this.webSocketHelper.createWebSocket();
        return this;
    }

    //添加消费者
    consumer(address, event) {
        // 确保 是一个 set
        if (!this.events[address]) {
            this.events[address] = new Set();
        }
        this.events[address].add(event);
    };

    //添加 websocket 消费者
    wsConsumer(address, event) {
        // 确保 是一个 set
        if (!this.wsEvents[address]) {
            this.wsEvents[address] = new Set();
        }
        this.wsEvents[address].add(event);
    };

    //发送事件
    publish(address, message) {
        const es = this.events[address];
        if (es) {
            for (const c of es) {
                try {
                    c(message);
                } catch (e) {
                    console.warn(e)
                }
            }
        }
    };

    //发送事件
    wsPublish(address, body, headers = null) {
        this.webSocketHelper.send(new WSMessage(address, body, headers));
    };

}

export {
    ScxEventBus
}