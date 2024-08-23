import {QueryLike} from "./QueryLike.js";
import {QueryImpl} from "./QueryImpl.js";

class LimitInfo extends QueryLike {

    #offset;

    #limit;

    constructor() {
        super();
        this.#offset = null;
        this.#limit = null;
    }

    offset(limitOffset) {
        if (limitOffset < 0) {
            throw new Error("Limit 参数错误 : offset (偏移量) 不能小于 0 !!!");
        }
        this.#offset = limitOffset;
        return this;
    }

    limit(numberOfRows) {
        if (numberOfRows < 0) {
            throw new Error("Limit 参数错误 : limit (行长度) 不能小于 0 !!!");
        }
        this.#limit = numberOfRows;
        return this;
    }

    getOffset() {
        return this.#offset;
    }

    getLimit() {
        return this.#limit;
    }

    clearOffset() {
        this.#offset = null;
        return this;
    }

    clearLimit() {
        this.#limit = null;
        return this;
    }

    getLimitInfo() {
        return this;
    }

    toQuery() {
        return new QueryImpl(this);
    }

}

export {LimitInfo};
