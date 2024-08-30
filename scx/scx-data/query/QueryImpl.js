import {Query} from "../Query.js";

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


    where(whereClauses) {
        this.#where.push(whereClauses);
        return this;
    }

    groupBy(groupByClauses) {
        this.#groupBy.push(groupByClauses);
        return this;
    }


    orderBy(orderByClauses) {
        this.#orderBy.push(orderByClauses);
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

    addWhere(whereClauses) {
        this.#where.push(whereClauses);
        return this;
    }

    addGroupBy(groupByClauses) {
        this.#groupBy.push(groupByClauses);
        return this;
    }


    addOrderBy(orderByClauses) {
        this.#orderBy.push(orderByClauses);
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
        this.#offset = null;
        return this;
    }


    clearLimit() {
        this.#limit = null;
        return this;
    }

}

export {QueryImpl};
