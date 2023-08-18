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
     * a
     *
     */
    reconnectTimeout;

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
        this._closeQuietly();
        this.ws = new WebSocket(this.url, this.protocols);
        this._addWebSocketEventListener();
        return this;
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
        return this;
    }

    /**
     * 关闭连接 一般由 用户主动调用 会触发 close 和 error 事件
     * @param { number? } code
     * @param { string? } reason
     */
    close(code, reason) {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.lockReconnect = false;
        }
        if (this.ws) {
            this._removeWebSocketEventListener();
            this.ws.addEventListener("close", this._closeEvent);
            this.ws.addEventListener("error", this._errorEvent);
        }
        if (this.ws) {
            this.ws.close(code, reason);
            console.log(`%c WebSocket 主动关闭... ${new Date()} `, "background: #fc5531; color: #fff");
        }
        return this;
    }

    /**
     * 安静的关闭 一般由 内部调用, 不会触发任何事件(因为已经被移除)
     */
    _closeQuietly() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.lockReconnect = false;
        }
        if (this.ws) {
            this._removeWebSocketEventListener();
        }
        if (this.ws) {
            this.ws.close();
        }
    }

    /**
     * 重连方法
     */
    _reconnect() {
        if (this.lockReconnect) {
            return;
        }
        console.warn("WebSocket 重连中... ", new Date());
        this.lockReconnect = true;
        this.reconnectTimeout = setTimeout(() => {  //没连接上会一直重连，设置延迟为5000毫秒避免请求过多
            this.lockReconnect = false;
            this.connect();
        }, 5000);
    }

    /**
     * 重试发送错误的请求
     */
    _retryFailedSendEvents() {
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

    _openEvent = (_event) => {
        console.log(`%c WebSocket 连接成功... ${new Date()} `, "background: #222; color: #bada55");
        const event = cloneEvent(_event);
        this.dispatchEvent(event);
        this._retryFailedSendEvents();
    };

    _messageEvent = (_event) => {
        const event = cloneEvent(_event);
        this.dispatchEvent(event);
    };

    _closeEvent = (_event) => {
        const event = cloneEvent(_event);
        this.dispatchEvent(event);
    };

    _errorEvent = (_event) => {
        const event = cloneEvent(_event);
        this.dispatchEvent(event);
    };

    _closeAndReconnectEvent = (_event) => {
        this._closeEvent(_event);
        this._reconnect();
    };

    _errorAndReconnectEvent = (_event) => {
        this._errorEvent(_event);
        this._reconnect();
    };

    _addWebSocketEventListener() {
        this.ws.addEventListener("open", this._openEvent);
        this.ws.addEventListener("message", this._messageEvent);
        this.ws.addEventListener("close", this._closeAndReconnectEvent);
        this.ws.addEventListener("error", this._errorAndReconnectEvent);
    }

    _removeWebSocketEventListener() {
        this.ws.removeEventListener("open", this._openEvent);
        this.ws.removeEventListener("message", this._messageEvent);
        this.ws.removeEventListener("close", this._closeEvent);
        this.ws.removeEventListener("error", this._errorEvent);
        this.ws.removeEventListener("close", this._closeAndReconnectEvent);
        this.ws.removeEventListener("error", this._errorAndReconnectEvent);
    }

}

export {ScxWebSocket};
