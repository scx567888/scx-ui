import {isBlank} from "../../../util/index.js";
import {QueryImpl} from "./QueryImpl.js";
import {ofInfo} from "./QueryOption.js";

class OrderBy {

    #name;
    #orderByType;
    #info;

    constructor(name, orderByType, ...options) {
        if (isBlank(name)) {
            throw new Error("OrderBy 参数错误 : 名称 不能为空 !!!");
        }
        if (orderByType == null) {
            throw new Error("OrderBy 参数错误 : orderByType 不能为空 !!!");
        }
        this.#name = name;
        this.#orderByType = orderByType;
        this.#info = ofInfo(...options);
    }


    name() {
        return this.#name;
    }

    orderByType() {
        return this.#orderByType;
    }

    info() {
        return this.#info;
    }

    toQuery() {
        return new QueryImpl().orderBy(this);
    }

}

export {OrderBy};
