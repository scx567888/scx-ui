import {ScxWebSocket} from "./scx-web-socket.js";
import {WSMessage} from "./_scx-event-bus/WSMessage.js";
import {initBaseURL} from "./_scx-event-bus/ScxEventBusHelper.js";
import {inject} from "vue";

class ScxEventBus {

    LOVE = "❤";// 心跳检测字符

    startLoveInterval = null;// 心跳检测定时器

    /**
     * @type{ScxWebSocket}
     */
    scxWebSocket;
    events = {};// 事件列表
    wsEvents = {};// ws 事件列表

    /**
     *
     * @param baseURL
     */
    constructor(baseURL) {
        this.scxWebSocket = new ScxWebSocket(new URL("scx", initBaseURL(baseURL)));

        //监听 websocket 的事件
        this.scxWebSocket.addEventListener("message", (event) => {
            //心跳检测
            if (event.data === this.LOVE) {
                console.log(`%c WebSocket 心跳检测成功...  ${new Date()} `, "background: #222; color: #2196f3");
                return;
            }
            const json = JSON.parse(event.data);
            const wsMessage = new WSMessage(json.address, json.body, json.headers);
            if (wsMessage.address) {
                const es = this.wsEvents[wsMessage.address];
                if (es) {
                    for (const c of es) {
                        try {
                            c(wsMessage.body);
                        } catch (e) {
                            console.warn(e);
                        }
                    }
                }
            }
        });

        this.scxWebSocket.addEventListener("open", () => {
            this.publish(ON_WEBSOCKET_OPEN);
            this.startLove();
        });

        this.scxWebSocket.addEventListener("error", () => {
            this.clearStartLove();
        });

        this.scxWebSocket.addEventListener("close", () => {
            this.clearStartLove();
        });

    }

    /**
     * 手动启动连接
     */
    connect() {
        this.scxWebSocket.connect();
        return this;
    }

    unregisterConsumer(address, event) {
        // 确保 是一个 set
        if (this.events[address]) {
            this.events[address].delete(event);
        }
    };

    unregisterWSConsumer(address, event) {
        if (this.wsEvents[address]) {
            this.wsEvents[address].delete(event);
        }
    };

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
                    console.warn(e);
                }
            }
        }
    };

    //发送事件
    wsPublish(address, body, headers = null) {
        const wsMessage = new WSMessage(address, body, headers);
        this.scxWebSocket.send(JSON.stringify(wsMessage));
    };

    startLove() {
        //5 分钟检测一次
        this.startLoveInterval = setInterval(() => this.scxWebSocket.send(this.LOVE), 1000 * 60 * 5);
    }

    clearStartLove() {
        if (this.startLoveInterval != null) {
            clearInterval(this.startLoveInterval);
        }
    }

    install(app) {
        app.provide(scxEventBusKey, this);
    }

}

/**
 *
 * @type {string}
 */
const scxEventBusKey = "scx-event-bus";

/**
 *
 * @returns {ScxEventBus}
 */
function useScxEventBus() {
    return inject(scxEventBusKey);
}

const ON_WEBSOCKET_OPEN = "ON_WEBSOCKET_OPEN";

export {
    ScxEventBus,
    scxEventBusKey,
    useScxEventBus,
    ON_WEBSOCKET_OPEN,
};
