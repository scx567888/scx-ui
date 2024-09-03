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
        this.#addWhere(...whereClauses);
        return this;
    }

    groupBy(...groupByClauses) {
        this.clearGroupBy();
        this.#addGroupBy(...groupByClauses);
        return this;
    }


    orderBy(...orderByClauses) {
        this.clearOrderBy();
        this.#addOrderBy(...orderByClauses);
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

    #addWhere(...whereClauses) {
        for (let whereClause of whereClauses) {
            if (whereClause == null) {
                continue;
            }
            if (Array.isArray(whereClause)) {
                this.#addWhere(...whereClause);
                continue;
            }
            this.#where.push(whereClause);
        }
        return this;
    }

    #addGroupBy(...groupByClauses) {
        for (let groupByClause of groupByClauses) {
            if (groupByClause == null) {
                continue;
            }
            if (Array.isArray(groupByClause)) {
                this.#addGroupBy(...groupByClause);
                continue;
            }
            this.#groupBy.push(groupByClause);
        }
        return this;
    }

    #addOrderBy(...orderByClauses) {
        for (let orderByClause of orderByClauses) {
            if (orderByClause == null) {
                continue;
            }
            if (Array.isArray(orderByClause)) {
                this.#addOrderBy(...orderByClause);
                continue;
            }
            this.#orderBy.push(orderByClause);
        }
        return this;
    }

}

export {QueryImpl};
