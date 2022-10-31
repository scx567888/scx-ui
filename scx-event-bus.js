import {WebSocketHelper} from "./_scx-event-bus/WebSocketHelper.js";
import {EBEvent} from "./_scx-event-bus/EBEvent.js";
import {WSBody} from "./_scx-event-bus/WSBody.js";
import {initBaseURL} from "./_scx-event-bus/ScxEventBusHelper";

class ScxEventBus {
    webSocketHelper;// websocket helper
    eventList = [];// 事件列表
    wsEventList = [];// ws 事件列表

    /**
     *
     * @param baseURL
     */
    constructor(baseURL) {
        this.webSocketHelper = new WebSocketHelper(new URL('/scx', initBaseURL(baseURL)));

        //监听 websocket 的事件
        this.webSocketHelper.onmessage = (data) => {
            const json = JSON.parse(data);
            const wsBody = new WSBody(json.name, json.data);
            if (wsBody.name) {
                this.wsEventList.filter(c => c.name === wsBody.name).forEach(c => {
                    try {
                        c.event(wsBody.data)
                    } catch (e) {
                        console.warn(e)
                    }
                });
            }
        }
    }

    /**
     * 手动启动连接
     */
    createWebSocket() {
        this.webSocketHelper.createWebSocket();
        return this;
    }

    //添加消费者
    consumer(name, event) {
        const b = this.eventList.some(c => c.name === name && c.event === event);
        if (!b) {
            this.eventList.push(new EBEvent(name, event));
        }
    };

    //添加 websocket 消费者
    wsConsumer(name, event) {
        const b = this.wsEventList.some(c => c.name === name && c.event === event);
        if (!b) {
            this.wsEventList.push(new EBEvent(name, event));
        }
    };

    //发送事件
    publish(name, message) {
        this.eventList.filter(c => c.name === name).forEach(c => {
            try {
                c.event(message);
            } catch (e) {
                console.warn(e)
            }
        });
    };

    //发送事件
    wsPublish(name, message) {
        this.webSocketHelper.send(new WSBody(name, message));
    };

}

export {
    ScxEventBus
}