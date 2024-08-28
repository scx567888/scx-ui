import {isBlank} from "../../../util/index.js";
import {QueryImpl} from "./QueryImpl.js";

class GroupBy {

    #name;
    #info;

    constructor(name, info) {
        if (isBlank(name)) {
            throw new Error("GroupBy 参数错误 : 名称 不能为空 !!!");
        }
        this.#name = name.trim();
        this.#info = info;
    }

    name() {
        return this.#name;
    }

    info() {
        return this.#info;
    }

    toQuery() {
        return new QueryImpl().groupBy(this);
    }

}

export {
    GroupBy,
};
