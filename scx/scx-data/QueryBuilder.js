import {WhereClause} from "./query/WhereClause.js";
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
} from "./query/WhereType.js";
import {GroupBy} from "./query/GroupBy.js";
import {Where} from "./query/Where.js";
import {QueryImpl} from "./query/QueryImpl.js";
import {WhereSet} from "./query/WhereSet.js";
import {AND} from "./query/AND.js";
import {OR} from "./query/OR.js";
import {_AND, _OR} from "./query/LogicType.js";
import {OrderBy} from "./query/OrderBy.js";
import {OrderBySet} from "./query/OrderBySet.js";
import {ASC, DESC} from "./query/OrderByType.js";

function query(oldQuery) {
    return new QueryImpl(oldQuery);
}

function where(whereClauses) {
    return new QueryImpl().where(whereClauses);
}

function groupBy(groupByClauses) {
    return new QueryImpl().groupBy(groupByClauses);
}

function orderBy(orderByClauses) {
    return new QueryImpl().orderBy(orderByClauses);
}

function offset(limitOffset) {
    return new QueryImpl().offset(limitOffset);
}

function limit(numberOfRows) {
    return new QueryImpl().limit(numberOfRows);
}

function and(clauses) {
    return new AND(clauses);
}

function or(clauses) {
    return new OR(clauses);
}

function andSet() {
    return new WhereSet(_AND);
}

function orSet() {
    return new WhereSet(_OR);
}

function asc(name, options) {
    return new OrderBy(name, ASC, options);
}

function desc(name, options) {
    return new OrderBy(name, DESC, options);
}

function orderBySet() {
    return new OrderBySet();
}

function isNull(fieldName, options) {
    return new Where(fieldName, IS_NULL, null, null, options);
}

function isNotNull(fieldName, options) {
    return new Where(fieldName, IS_NOT_NULL, null, null, options);
}

function eq(fieldName, value, options) {
    return new Where(fieldName, EQUAL, value, null, options);
}

function ne(fieldName, value, options) {
    return new Where(fieldName, NOT_EQUAL, value, null, options);
}

function gt(fieldName, value, options) {
    return new Where(fieldName, GREATER_THAN, value, null, options);
}

/**
 * 大于等于
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     比较值
 * @param options   配置
 * @return this 方便链式调用
 */
function ge(fieldName, value, options) {
    return new Where(fieldName, GREATER_THAN_OR_EQUAL, value, null, options);
}

/**
 * 小于
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     比较值
 * @param options   配置
 * @return this 方便链式调用
 */
function lt(fieldName, value, options) {
    return new Where(fieldName, LESS_THAN, value, null, options);
}

/**
 * 小于等于
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     比较值
 * @param options   配置
 * @return this 方便链式调用
 */
function le(fieldName, value, options) {
    return new Where(fieldName, LESS_THAN_OR_EQUAL, value, null, options);
}

/**
 * 两者之间
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value1    比较值1
 * @param value2    比较值2
 * @param options   配置
 * @return this 方便链式调用
 */
function between(fieldName, value1, value2, options) {
    return new Where(fieldName, BETWEEN, value1, value2, options);
}

/**
 * 不处于两者之间
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value1    比较值1
 * @param value2    比较值2
 * @param options   配置
 * @return this 方便链式调用
 */
function notBetween(fieldName, value1, value2, options) {
    return new Where(fieldName, NOT_BETWEEN, value1, value2, options);
}

/**
 * like : 根据 SQL 表达式进行判断
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     SQL 表达式
 * @param options   配置
 * @return this 方便链式调用
 */
function likeRegex(fieldName, value, options) {
    return new Where(fieldName, LIKE_REGEX, value, null, options);
}

/**
 * not like : 根据 SQL 表达式进行判断
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     SQL 表达式
 * @param options   配置
 * @return this 方便链式调用
 */
function notLikeRegex(fieldName, value, options) {
    return new Where(fieldName, NOT_LIKE_REGEX, value, null, options);
}

/**
 * like : 默认会在首尾添加 %
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     参数 默认会在首尾添加 %
 * @param options   配置
 * @return this 方便链式调用
 */
function like(fieldName, value, options) {
    return new Where(fieldName, LIKE, value, null, options);
}

/**
 * not like : 默认会在首尾添加 %
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     默认会在首尾添加 %
 * @param options   配置
 * @return this 方便链式调用
 */
function notLike(fieldName, value, options) {
    return new Where(fieldName, NOT_LIKE, value, null, options);
}

/**
 * 包含  : 一般用于 JSON 格式字段 区别于 in
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     比较值
 * @param options   配置
 * @return this 方便链式调用
 */
function jsonContains(fieldName, value, options) {
    return new Where(fieldName, JSON_CONTAINS, value, null, options);
}

/**
 * 在其中
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     比较值
 * @param options   配置
 * @return this 方便链式调用
 */
function in_(fieldName, value, options) {
    return new Where(fieldName, IN, value, null, options);
}

/**
 * 不在其中
 *
 * @param fieldName 名称 (注意 : 默认为字段名称 , 不是数据库名称)
 * @param value     比较值
 * @param options   配置
 * @return this 方便链式调用
 */
function notIn(fieldName, value, options) {
    return new Where(fieldName, NOT_IN, value, null, options);
}

function whereClause(whereClause, params) {
    return new WhereClause(whereClause, params);
}

export {
    query,
    where,
    groupBy,
    orderBy,
    offset,
    limit,
    and,
    or,
    andSet,
    orSet,
    asc,
    desc,
    orderBySet,
    isNull,
    isNotNull,
    eq,
    ne,
    gt,
    ge,
    lt,
    le,
    between,
    notBetween,
    likeRegex,
    notLikeRegex,
    like,
    notLike,
    jsonContains,
    in_,
    notIn,
    whereClause,
};
