import {QueryLike} from "./QueryLike.js";
import {isBlank} from "../../../util/index.js";
import {QueryImpl} from "./QueryImpl.js";
import {ofInfo} from "./QueryOption.js";

class Where extends QueryLike {

    #name;
    #whereType;
    #value1;
    #value2;
    #info;

    constructor(name, whereType, value1, value2, ...options) {
        super();
        //名称不能为空
        if (isBlank(name)) {
            throw new Error("Where 参数错误 : 名称 不能为空 !!!");
        }
        //类型也不能为空
        if (whereType == null) {
            throw new Error("Where 参数错误 : whereType 不能为空 !!!");
        }
        this.#name = name;
        this.#whereType = whereType;
        this.#value1 = value1;
        this.#value2 = value2;
        this.#info = ofInfo(...options);
    }

    name() {
        return this.#name;
    }

    whereType() {
        return this.#whereType;
    }

    value1() {
        return this.#value1;
    }

    value2() {
        return this.#value2;
    }

    info() {
        return this.#info;
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {
    Where,
};
