import {isBlank} from "../../../util/index.js";
import {QueryImpl} from "./QueryImpl.js";
import {QueryLike} from "./QueryLike.js";

class GroupBy extends QueryLike {

    #name;
    #info;

    constructor(name, info) {
        super();
        if (isBlank(name)) {
            throw new Error("GroupBy 参数错误 : 名称 不能为空 !!!");
        }
        this.#name = name;
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
