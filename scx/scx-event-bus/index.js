import {MultiMap} from "../../util/index.js";

class ScxEventBus {

    /**
     *
     * @type {MultiMap}
     */
    handlers = new MultiMap();

    /**
     * 添加一个处理器
     *
     * @param {String} address
     * @param {Function} callback
     */
    addHandler(address, callback) {
        this.handlers.set(address, callback);
    }

    /**
     * 发布消息
     *
     * @param {String} address
     * @param {Object} message
     */
    publish(address, message) {
        const handlers = this.handlers.get(address);
        for (const callback of handlers) {
            try {
                callback(message);
            } catch (e) {
                console.warn(e);
            }
        }
    }

    /**
     * 移除一个处理器
     *
     * @param {String} address
     * @param {Function} callback
     */
    removeHandler(address, callback) {
        this.handlers.delete(address, callback);
    }

    /**
     * 兼容 EventTarget 写法
     * @param type
     * @param callback
     * @param options
     */
    addEventListener(type, callback, options) {
        this.addHandler(type, callback);
    }

    /**
     * 兼容 EventTarget 写法
     * @param event
     */
    dispatchEvent(event) {
        this.publish(event.type, event);
    }

    /**
     * 兼容 EventTarget 写法
     * @param type
     * @param callback
     * @param options
     */
    removeEventListener(type, callback, options) {
        this.removeHandler(type, callback);
    }

}

export {ScxEventBus};
