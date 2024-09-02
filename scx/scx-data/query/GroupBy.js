import {isBlank} from "../../../util/index.js";
import {QueryImpl} from "./QueryImpl.js";
import {QueryLike} from "./QueryLike.js";
import {ofInfo} from "./QueryOption.js";

class GroupBy extends QueryLike {

    #name;
    #info;

    constructor(name, ...options) {
        super();
        if (isBlank(name)) {
            throw new Error("GroupBy 参数错误 : 名称 不能为空 !!!");
        }
        this.#name = name;
        this.#info = ofInfo(...options);
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
