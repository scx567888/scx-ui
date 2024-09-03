class Query {

    where(...whereClauses) {
        return this;
    }

    groupBy(...groupByClauses) {
        return this;
    }

    orderBy(...orderByClauses) {
        return this;
    }

    offset(limitOffset) {
        return this;
    }

    limit(numberOfRows) {
        return this;
    }

    getWhere() {
    }

    getGroupBy() {
    }

    getOrderBy() {
    }

    getOffset() {
    }

    getLimit() {
    }

    clearWhere() {
        return this;
    }

    clearGroupBy() {
        return this;
    }

    clearOrderBy() {
        return this;
    }

    clearOffset() {
        return this;
    }

    clearLimit() {
        return this;
    }

}

export {Query};
