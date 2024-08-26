import {QueryLike} from "./QueryLike.js";
import {QueryImpl} from "./QueryImpl.js";

class GroupBy extends QueryLike {

    #clauses;

    constructor() {
        super();
        this.#clauses = [];
    }
    
    set(clauses) {
        this.#clauses = clauses;
        return this;
    }

    add(groupByClauses) {
        this.#clauses = this.#clauses.concat(groupByClauses);
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
    GroupBy,
};
