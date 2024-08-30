class WhereType {

    #value;

    constructor(value) {
        this.#value = value;
    }

    value() {
        return this.#value;
    }

}

/**
 * 为空
 */
const IS_NULL = new WhereType("IS_NULL");

/**
 * 不为空
 */
const IS_NOT_NULL = new WhereType("IS_NOT_NULL");

/**
 * 等于
 */
const EQUAL = new WhereType("EQUAL");

/**
 * 不等于
 */
const NOT_EQUAL = new WhereType("NOT_EQUAL");

/**
 * 小于
 */
const LESS_THAN = new WhereType("LESS_THAN");

/**
 * 小于等于
 */
const LESS_THAN_OR_EQUAL = new WhereType("LESS_THAN");

/**
 * 大于
 */
const GREATER_THAN = new WhereType("GREATER_THAN");

/**
 * 大于等于
 */
const GREATER_THAN_OR_EQUAL = new WhereType("GREATER_THAN");

/**
 * Like
 */
const LIKE = new WhereType("LIKE");

/**
 * Not Like
 */
const NOT_LIKE = new WhereType("NOT_LIKE");

/**
 * Like 正则表达式
 */
const LIKE_REGEX = new WhereType("LIKE_REGEX");

/**
 * Like 正则表达式
 */
const NOT_LIKE_REGEX = new WhereType("NOT_LIKE_REGEX");

/**
 * IN
 */
const IN = new WhereType("IN");

/**
 * NOT IN
 */
const NOT_IN = new WhereType("NOT_IN");

/**
 * 在之间
 */
const BETWEEN = new WhereType("BETWEEN");

/**
 * 不在之间
 */
const NOT_BETWEEN = new WhereType("NOT_BETWEEN");

/**
 * json 包含 一般用于 数组判断
 */
const JSON_CONTAINS = new WhereType("JSON_CONTAINS");


export {
    IS_NULL,
    IS_NOT_NULL,
    EQUAL,
    NOT_EQUAL,
    LESS_THAN,
    LESS_THAN_OR_EQUAL,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL,
    LIKE,
    NOT_LIKE,
    LIKE_REGEX,
    NOT_LIKE_REGEX,
    IN,
    NOT_IN,
    BETWEEN,
    NOT_BETWEEN,
    JSON_CONTAINS,
};
