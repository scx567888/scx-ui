import {ScxEventBus} from "./scx-event-bus.js";

function cloneEvent(oldEvent) {
    return new oldEvent.constructor(oldEvent.type, oldEvent);
}

/**
 * 具有自动重连功能的 WebSocket
 */
class ScxWebSocket extends ScxEventBus {

    /**
     *  WebSocket 连接参数
     */
    url;

    /**
     * WebSocket 连接参数
     */
    protocols;

    /**
     * 因连接状态发送失败的请求 都会被存储到这里 待到下一次连接成功时 全部发送给服务器
     * @type {[]}
     */
    failedSendDataList = [];

    /**
     * 连接对象
     * @type {WebSocket}
     */
    ws = null;

    /**
     *  因为 close 和 error 都会触发重连, 所以这里用锁防止重复触发
     * @type {boolean}
     */
    lockReconnect = false;

    /**
     * 是否已经由用户手动关闭
     * @type {boolean}
     */
    forcedClose = false;

    /**
     * 创建 ScxWebSocket
     * @param {string | URL} url
     * @param {string | string[]} protocols
     */
    constructor(url, protocols = []) {
        super();
        this.url = url;
        this.protocols = protocols;
    }

    /**
     * 创建连接方法
     */
    connect() {
        // 创建连接
        this.ws = new WebSocket(this.url, this.protocols);

        // 连接成功事件
        this.ws.addEventListener("open", (_event) => {
            console.log(`%c WebSocket 连接成功... ${new Date()} `, "background: #222; color: #bada55");
            const event = cloneEvent(_event);
            this.dispatchEvent(event);
            this.retryFailedSendEvents();
        });

        // 消息发送事件
        this.ws.addEventListener("message", (_event) => {
            const event = cloneEvent(_event);
            this.dispatchEvent(event);
        });

        // 关闭事件
        this.ws.addEventListener("close", (_event) => {
            const event = cloneEvent(_event);
            this.dispatchEvent(event);
            this.reconnect();
        });

        // 连接异常事件
        this.ws.addEventListener("error", (_event) => {
            const event = cloneEvent(_event);
            this.dispatchEvent(event);
            this.reconnect();
        });

        return this;
    }

    /**
     * 重连方法
     */
    reconnect() {
        if (this.lockReconnect || this.forcedClose) {
            return;
        }
        console.warn("WebSocket 重连中... ", new Date());
        this.lockReconnect = true;
        setTimeout(() => {  //没连接上会一直重连，设置延迟为5000毫秒避免请求过多
            this.lockReconnect = false;
            this.connect();
        }, 5000);
    }

    /**
     * 发送消息
     * @param {string | ArrayBufferLike | Blob | ArrayBufferView} data
     */
    send(data) {
        try {
            this.ws.send(data);
        } catch (e) {
            this.failedSendDataList.push(data);
        }
    }

    /**
     * 重试发送错误的请求
     */
    retryFailedSendEvents() {
        for (let data of this.failedSendDataList) {
            try {
                this.ws.send(data);
            } catch (e) {// 如果还失败我们就不试了
                console.error(e);
            }
        }
        //清空数组中所有事件
        this.failedSendDataList.splice(0, this.failedSendDataList.length);
    }

    /**
     * 关闭连接
     * @param { number } code
     * @param { string } reason
     */
    close(code, reason) {
        this.forcedClose = true;
        if (this.ws) {
            this.ws.close(code, reason);
        }
        console.log(`%c WebSocket 主动关闭... ${new Date()} `, "background: #fc5531; color: #fff");
    }

}

export {ScxWebSocket};
