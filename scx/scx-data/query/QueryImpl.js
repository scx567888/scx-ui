import {Query} from "./Query.js";
import {Where} from "./Where.js";
import {GroupBy} from "./GroupBy.js";
import {OrderBy} from "./OrderBy.js";
import {LimitInfo} from "./LimitInfo.js";

class QueryImpl extends Query {

    /**
     * 自定义WHERE 添加
     */
    #where;

    /**
     * 自定义分组 SQL 添加
     */
    #groupBy;

    /**
     * 排序的字段
     */
    #orderBy;

    /**
     * 分页参数
     */
    #limitInfo;


    /**
     * 创建 Query 对象
     */
    constructor(old) {
        super();
        this.#where = new Where();
        this.#groupBy = new GroupBy();
        this.#orderBy = new OrderBy();
        this.#limitInfo = new LimitInfo();
    }


    where(whereClauses) {
        this.#where.set(whereClauses);
        return this;
    }

    groupBy(groupByClauses) {
        this.#groupBy.set(groupByClauses);
        return this;
    }


    orderBy(orderByClauses) {
        this.#orderBy.set(orderByClauses);
        return this;
    }


    addWhere(whereClauses) {
        this.#where.add(whereClauses);
        return this;
    }


    addGroupBy(groupByClauses) {
        this.#groupBy.add(groupByClauses);
        return this;
    }


    addOrderBy(orderByClauses) {
        this.#orderBy.add(orderByClauses);
        return this;
    }


    offset(limitOffset) {
        this.#limitInfo.offset(limitOffset);
        return this;
    }

    limit(numberOfRows) {
        this.#limitInfo.limit(numberOfRows);
        return this;
    }


    getWhere() {
        return this.#where;
    }


    getGroupBy() {
        return this.#groupBy;
    }


    getOrderBy() {
        return this.#orderBy;
    }


    getOffset() {
        return this.#limitInfo.getOffset();
    }


    getLimit() {
        return this.#limitInfo.getLimit();
    }


    getLimitInfo() {
        return this.#limitInfo;
    }


    clearWhere() {
        this.#where.clear();
        return this;
    }


    clearGroupBy() {
        this.#groupBy.clear();
        return this;
    }


    clearOrderBy() {
        this.#orderBy.clear();
        return this;
    }


    clearOffset() {
        this.#limitInfo.clearOffset();
        return this;
    }


    clearLimit() {
        this.#limitInfo.clearLimit();
        return this;
    }

}

export {QueryImpl};
