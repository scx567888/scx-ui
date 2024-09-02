import {Query} from "./Query.js";

class QueryImpl extends Query {

    #where;
    #groupBy;
    #orderBy;
    #offset;
    #limit;


    /**
     * 创建 Query 对象
     */
    constructor(old) {
        super();
        this.#where = [];
        this.#groupBy = [];
        this.#orderBy = [];
        this.#offset = null;
        this.#limit = null;
    }


    where(...whereClauses) {
        this.clearWhere();
        this.addWhere(...whereClauses);
        return this;
    }

    groupBy(...groupByClauses) {
        this.clearGroupBy();
        this.addGroupBy(...groupByClauses);
        return this;
    }


    orderBy(...orderByClauses) {
        this.clearOrderBy();
        this.addOrderBy(...orderByClauses);
        return this;
    }


    offset(limitOffset) {
        this.#offset = limitOffset;
        return this;
    }

    limit(numberOfRows) {
        this.#limit = numberOfRows;
        return this;
    }

    addWhere(...whereClauses) {
        for (let whereClause of whereClauses) {
            this.#where.push(whereClause);
        }
        return this;
    }

    addGroupBy(...groupByClauses) {
        for (let groupByClause of groupByClauses) {
            this.#groupBy.push(groupByClause);
        }
        return this;
    }

    addOrderBy(...orderByClauses) {
        for (let orderByClause of orderByClauses) {
            this.#orderBy.push(orderByClause);
        }
        return this;
    }

    removeWhereIf(filter) {
        return this;
    }

    removeGroupByIf(filter) {
        return this;
    }

    removeOrderByIf(filter) {
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
        return this.#offset;
    }

    getLimit() {
        return this.#limit;
    }

    clearWhere() {
        this.#where = [];
        return this;
    }

    clearGroupBy() {
        this.#groupBy = [];
        return this;
    }

    clearOrderBy() {
        this.#orderBy = [];
        return this;
    }

    clearOffset() {
        this.#offset = null;
        return this;
    }

    clearLimit() {
        this.#limit = null;
        return this;
    }

}

export {QueryImpl};
