import {QueryImpl} from "./QueryImpl.js";
import {QueryLike} from "./QueryLike.js";

class Where extends QueryLike {

    #clauses;

    constructor() {
        super();
        this.#clauses = [];
    }

    isEmpty() {
        return this.#clauses.length === 0;
    }

    set(whereClauses) {
        this.#clauses = whereClauses;
        return this;
    }

    add(whereClauses) {
        this.#clauses = this.#clauses.concat(whereClauses);
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

export {Where};
