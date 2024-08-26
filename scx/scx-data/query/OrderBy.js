import {QueryLike} from "./QueryLike.js";
import {QueryImpl} from "./QueryImpl.js";

class OrderBy extends QueryLike {

    #clauses;

    constructor() {
        super();
        this.#clauses = [];
    }

    set(orderByClauses) {
        this.#clauses = orderByClauses;
        return this;
    }

    add(orderByClauses) {
        this.#clauses = this.#clauses.concat(orderByClauses);
        return this;
    }

    clauses() {
        return this.#clauses;
    }

    clear() {
        this.#clauses = [];
        return this;
    }

    toQuery() {
        return new QueryImpl(this);
    }

}

export {
    OrderBy
}
