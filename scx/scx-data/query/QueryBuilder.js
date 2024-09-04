import {WhereClause} from "./WhereClause.js";
import {
    BETWEEN,
    EQUAL,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL,
    IN,
    IS_NOT_NULL,
    IS_NULL,
    JSON_CONTAINS,
    JSON_OVERLAPS,
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
import {AND, OR} from "./LogicType.js";
import {OrderBy} from "./OrderBy.js";
import {ASC, DESC} from "./OrderByType.js";
import {Logic} from "./Logic.js";

function query(oldQuery) {
    return new QueryImpl(oldQuery);
}

function where(...whereClauses) {
    return new QueryImpl().where(...whereClauses);
}

function groupBy(...groupByClauses) {
    return new QueryImpl().groupBy(...groupByClauses);
}

function orderBy(...orderByClauses) {
    return new QueryImpl().orderBy(...orderByClauses);
}

function offset(limitOffset) {
    return new QueryImpl().offset(limitOffset);
}

function limit(numberOfRows) {
    return new QueryImpl().limit(numberOfRows);
}

function and(...clauses) {
    return new Logic(AND).add(...clauses);
}

function or(...clauses) {
    return new Logic(OR).add(...clauses);
}

function asc(name, ...options) {
    return new OrderBy(name, ASC, ...options);
}

function desc(name, ...options) {
    return new OrderBy(name, DESC, ...options);
}

function eq(fieldName, value, ...options) {
    return new Where(fieldName, EQUAL, value, null, ...options);
}

function ne(fieldName, value, ...options) {
    return new Where(fieldName, NOT_EQUAL, value, null, ...options);
}


function lt(fieldName, value, ...options) {
    return new Where(fieldName, LESS_THAN, value, null, ...options);
}

function le(fieldName, value, ...options) {
    return new Where(fieldName, LESS_THAN_OR_EQUAL, value, null, ...options);
}

function gt(fieldName, value, ...options) {
    return new Where(fieldName, GREATER_THAN, value, null, ...options);
}

function ge(fieldName, value, ...options) {
    return new Where(fieldName, GREATER_THAN_OR_EQUAL, value, null, ...options);
}

function isNull(fieldName, ...options) {
    return new Where(fieldName, IS_NULL, null, null, ...options);
}

function isNotNull(fieldName, ...options) {
    return new Where(fieldName, IS_NOT_NULL, null, null, ...options);
}

function like(fieldName, value, ...options) {
    return new Where(fieldName, LIKE, value, null, ...options);
}

function notLike(fieldName, value, ...options) {
    return new Where(fieldName, NOT_LIKE, value, null, ...options);
}

function likeRegex(fieldName, value, ...options) {
    return new Where(fieldName, LIKE_REGEX, value, null, ...options);
}

function notLikeRegex(fieldName, value, ...options) {
    return new Where(fieldName, NOT_LIKE_REGEX, value, null, ...options);
}

function in_(fieldName, value, ...options) {
    return new Where(fieldName, IN, value, null, ...options);
}

function notIn(fieldName, value, ...options) {
    return new Where(fieldName, NOT_IN, value, null, ...options);
}

function between(fieldName, value1, value2, ...options) {
    return new Where(fieldName, BETWEEN, value1, value2, ...options);
}

function notBetween(fieldName, value1, value2, ...options) {
    return new Where(fieldName, NOT_BETWEEN, value1, value2, ...options);
}

function jsonContains(fieldName, value, ...options) {
    return new Where(fieldName, JSON_CONTAINS, value, null, ...options);
}

function jsonOverlaps(fieldName, value, ...options) {
    return new Where(fieldName, JSON_OVERLAPS, value, null, ...options);
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
    asc,
    desc,
    eq,
    ne,
    lt,
    le,
    gt,
    ge,
    isNull,
    isNotNull,
    like,
    notLike,
    likeRegex,
    notLikeRegex,
    in_,
    notIn,
    between,
    notBetween,
    jsonContains,
    whereClause,
};
