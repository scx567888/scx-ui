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
import {Where} from "./Where.js";
import {QueryImpl} from "./QueryImpl.js";

class Logic extends QueryLike {

    #logicType;
    #clauses;

    constructor(logicType) {
        super();
        this.#logicType = logicType;
        this.#clauses = [];
    }

    logicType() {
        return this.#logicType;
    }

    clauses() {
        return this.#clauses;
    }

    add(logicCauses) {
        return this.#clauses.push(logicCauses);
    }

    addWhere(name, whereType, value1, value2, options) {
        return this.add(new Where(name, whereType, value1, options, options));
    }

    eq(fieldName, value, options) {
        return this.addWhere(fieldName, EQUAL, value, null, options);
    }

    ne(fieldName, value, options) {
        return this.addWhere(fieldName, NOT_EQUAL, value, null, options);
    }

    lt(fieldName, value, options) {
        return this.addWhere(fieldName, LESS_THAN, value, null, options);
    }

    le(fieldName, value, options) {
        return this.addWhere(fieldName, LESS_THAN_OR_EQUAL, value, null, options);
    }

    gt(fieldName, value, options) {
        return this.addWhere(fieldName, GREATER_THAN, value, null, options);
    }

    ge(fieldName, value, options) {
        return this.addWhere(fieldName, GREATER_THAN_OR_EQUAL, value, null, options);
    }


    isNull(fieldName, options) {
        return this.addWhere(fieldName, IS_NULL, null, null, options);
    }

    isNotNull(fieldName, options) {
        return this.addWhere(fieldName, IS_NOT_NULL, null, null, options);
    }

    like(fieldName, value, options) {
        return this.addWhere(fieldName, LIKE, value, null, options);
    }

    notLike(fieldName, value, options) {
        return this.addWhere(fieldName, NOT_LIKE, value, null, options);
    }

    likeRegex(fieldName, value, options) {
        return this.addWhere(fieldName, LIKE_REGEX, value, null, options);
    }

    notLikeRegex(fieldName, value, options) {
        return this.addWhere(fieldName, NOT_LIKE_REGEX, value, null, options);
    }

    in(fieldName, value, options) {
        return this.addWhere(fieldName, IN, value, null, options);
    }

    notIn(fieldName, value, options) {
        return this.addWhere(fieldName, NOT_IN, value, null, options);
    }

    between(fieldName, value1, value2, options) {
        return this.addWhere(fieldName, BETWEEN, value1, value2, options);
    }

    notBetween(fieldName, value1, value2, options) {
        return this.addWhere(fieldName, NOT_BETWEEN, value1, value2, options);
    }

    jsonContains(fieldName, value, options) {
        return this.addWhere(fieldName, JSON_CONTAINS, value, null, options);
    }

    toQuery() {
        return new QueryImpl().where([this]);
    }

}

export {
    Logic,
};
