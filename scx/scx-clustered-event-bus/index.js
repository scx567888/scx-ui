import {WSMessage} from "./ws-message.js";
import {initBaseURL} from "./scx-clustered-event-bus-helper.js";
import {ScxWebSocket} from "../scx-web-socket/index.js";
import {ScxEventBus} from "../scx-event-bus/index.js";
import {MultiMap} from "../../util/index.js";

class ScxClusteredEventBus extends ScxEventBus {

    LOVE = "❤";// 心跳检测字符

    startLoveInterval = null;// 心跳检测定时器

    /**
     * @type{ScxWebSocket}
     */
    scxWebSocket;

    /**
     *
     * @type {MultiMap}
     */
    clusteredHandlers = new MultiMap();// ws 事件列表

    /**
     *
     * @param baseURL
     */
    constructor(baseURL) {
        super();
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
                const es = this.clusteredHandlers.get(wsMessage.address);
                for (const c of es) {
                    try {
                        c(wsMessage.body);
                    } catch (e) {
                        console.warn(e);
                    }
                }
            }
        });

        this.scxWebSocket.addEventListener("open", () => {
            this.publish(ON_WEBSOCKET_OPEN, undefined);
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

    removeClusteredHandler(address, callback) {
        this.clusteredHandlers.delete(address, callback);
    };

    //添加 websocket 消费者
    addClusteredHandler(address, callback) {
        this.clusteredHandlers.set(address, callback);
    };

    //发送事件
    clusteredPublish(address, body, headers = null) {
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

}

const ON_WEBSOCKET_OPEN = "ON_WEBSOCKET_OPEN";

export {
    ScxClusteredEventBus,
    ON_WEBSOCKET_OPEN,
    initBaseURL,
    WSMessage,
};
