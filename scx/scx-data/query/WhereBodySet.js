import {WhereBody} from "./WhereBody.js";
import {QueryLike} from "./QueryLike.js";
import {
    BETWEEN,
    EQUAL,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL,
    IN,
    IS_NOT_NULL,
    IS_NULL,
    JSON_CONTAINS,
    LESS_THAN,
    LESS_THAN_OR_EQUAL,
    LIKE,
    LIKE_REGEX,
    NOT_BETWEEN,
    NOT_EQUAL,
    NOT_IN,
    NOT_LIKE,
    NOT_LIKE_REGEX,
} from "./WhereType.js";
import {QueryImpl} from "./QueryImpl.js";

class WhereBodySet extends QueryLike {

    /**
     * 存储查询条件 key 为 fieldName ,采用 map 而不是 list 是为了保证重复添加的会直接覆盖
     */
    #whereBodyList;

    #type;

    /**
     * 创建一个 Where 对象
     */
    constructor(type) {
        super();
        this.#type = type;
        this.#whereBodyList = [];
    }

    add2(name, whereType, value1, value2, options) {
        return this._add(name, whereType, value1, value2, 2, options);
    }

    add1(name, whereType, value1, options) {
        return this._add(name, whereType, value1, null, 1, options);
    }

    add0(name, whereType, options) {
        return this._add(name, whereType, null, null, 0, options);
    }

    isEmpty() {
        return this.#whereBodyList.size() === 0;
    }

    isNull(fieldName, options) {
        return this.add0(fieldName, IS_NULL, options);
    }

    isNotNull(fieldName, options) {
        return this.add0(fieldName, IS_NOT_NULL, options);
    }

    eq(fieldName, value, options) {
        return this.add1(fieldName, EQUAL, value, options);
    }

    ne(fieldName, value, options) {
        return this.add1(fieldName, NOT_EQUAL, value, options);
    }

    gt(fieldName, value, options) {
        return this.add1(fieldName, GREATER_THAN, value, options);
    }

    ge(fieldName, value, options) {
        return this.add1(fieldName, GREATER_THAN_OR_EQUAL, value, options);
    }

    lt(fieldName, value, options) {
        return this.add1(fieldName, LESS_THAN, value, options);
    }

    le(fieldName, value, options) {
        return this.add1(fieldName, LESS_THAN_OR_EQUAL, value, options);
    }

    between(fieldName, value1, value2, options) {
        return this.add2(fieldName, BETWEEN, value1, value2, options);
    }

    notBetween(fieldName, value1, value2, options) {
        return this.add2(fieldName, NOT_BETWEEN, value1, value2, options);
    }

    likeRegex(fieldName, value, options) {
        return this.add1(fieldName, LIKE_REGEX, value, options);
    }

    notLikeRegex(fieldName, value, options) {
        return this.add1(fieldName, NOT_LIKE_REGEX, value, options);
    }

    like(fieldName, value, options) {
        return this.add1(fieldName, LIKE, value, options);
    }

    notLike(fieldName, value, options) {
        return this.add1(fieldName, NOT_LIKE, value, options);
    }

    jsonContains(fieldName, value, options) {
        return this.add1(fieldName, JSON_CONTAINS, value, options);
    }

    _in(fieldName, value, options) {
        return this.add1(fieldName, IN, value, options);
    }

    notIn(fieldName, value, options) {
        return this.add1(fieldName, NOT_IN, value, options);
    }

    _add(name, whereType, value1, value2, needParamSize, options) {
        //创建 option 信息
        const whereBody = new WhereBody(name, whereType, value1, value2, null);
        this.#whereBodyList.push(whereBody);
        return this;
    }

    remove(name) {

        return this;
    }

    clear() {
        this.#whereBodyList = [];
        return this;
    }

    type() {
        return this.#type;
    }

    clauses() {
        return this.#whereBodyList;
    }

    toQuery() {
        return new QueryImpl().where([this]);
    }

}

export {
    WhereBodySet
}
