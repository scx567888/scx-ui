import {Query} from "./Query.js";

class QueryLike extends Query {

    #query;

    query() {
        if (this.#query == null) {
            this.#query = this.toQuery();
        }
        return this.#query;
    }

    where(...whereClauses) {
        this.query().where(...whereClauses);
        return this;
    }

    groupBy(...groupByClauses) {
        this.query().groupBy(...groupByClauses);
        return this;
    }

    orderBy(...orderByClauses) {
        this.query().orderBy(...orderByClauses);
        return this;
    }

    offset(limitOffset) {
        this.query().offset(limitOffset);
        return this;
    }

    limit(numberOfRows) {
        this.query().limit(numberOfRows);
        return this;
    }

    getWhere() {
        return this.query().getWhere();
    }

    getGroupBy() {
        return this.query().getGroupBy();
    }

    getOrderBy() {
        return this.query().getOrderBy();
    }

    getOffset() {
        return this.query().getOffset();
    }

    getLimit() {
        return this.query().getLimit();
    }

    clearWhere() {
        this.query().clearWhere();
        return this;
    }

    clearGroupBy() {
        this.query().clearGroupBy();
        return this;
    }

    clearOrderBy() {
        this.query().clearOrderBy();
        return this;
    }

    clearOffset() {
        this.query().clearOffset();
        return this;
    }

    clearLimit() {
        this.query().clearLimit();
        return this;
    }

    toQuery() {
    }

}

export {QueryLike};
