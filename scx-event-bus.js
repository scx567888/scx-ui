import {WebSocketHelper} from "./_scx-event-bus/WebSocketHelper.js";
import {EBEvent} from "./_scx-event-bus/EBEvent.js";
import {WSBody} from "./_scx-event-bus/WSBody.js";
import {initBaseURL} from "./_scx-event-bus/ScxEventBusHelper";

class ScxEventBus {
    webSocketHelper;// websocket helper
    eventList = [];// 事件列表

    /**
     *
     * @param baseURL
     */
    constructor(baseURL) {
        this.webSocketHelper = new WebSocketHelper(new URL('/scx', initBaseURL(baseURL)));
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