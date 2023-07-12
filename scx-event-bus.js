class ScxEventBus {

    #handlers = {};

    /**
     * 添加一个处理器
     *
     * @param {String} address
     * @param {Function} callback
     */
    addHandler(address, callback) {
        if (!(address in this.#handlers)) {
            this.#handlers[address] = [];
        }
        this.#handlers[address].push(callback);
    }

    /**
     * 发布消息
     *
     * @param {String} address
     * @param {Object} message
     */
    publish(address, message) {
        const handlers = this.#handlers[address];
        if (handlers) {
            for (const callback of handlers) {
                try {
                    callback(message);
                } catch (e) {
                    console.warn(e);
                }
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
        const handlers = this.#handlers[address];
        if (handlers) {
            let index;
            do {
                index = handlers.indexOf(callback);
                handlers.splice(index, 1);
            }
            while (index !== -1);
            
            if (handlers.length === 0) {
                delete this.#handlers[address];
            }
        }
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
