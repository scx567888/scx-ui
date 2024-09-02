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

    addWhere(...whereClauses) {
        return this;
    }

    addGroupBy(...groupByClauses) {
        return this;
    }

    addOrderBy(...orderByClauses) {
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
