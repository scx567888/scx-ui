import {QueryLike} from "./QueryLike.js";
import {isBlank} from "../../../util/index.js";
import {QueryImpl} from "./QueryImpl.js";

class Where extends QueryLike {

    #name;
    #whereType;
    #value1;
    #value2;
    #info;

    constructor(name, whereType, value1, value2, info) {
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
        this.#info = info;
    }

    static getValidParamSize(value1, value2) {
        //有效的参数数量(不为空的) 每检测到一个有效的(不为空的) 便加 1
        let validParamSize = 0;
        if (value1 != null) {
            validParamSize = validParamSize + 1;
        }
        if (value2 != null) {
            validParamSize = validParamSize + 1;
        }
        return validParamSize;
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
        return new QueryImpl().where([this]);
    }

}

export {
    Where,
};
