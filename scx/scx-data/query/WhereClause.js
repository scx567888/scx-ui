import {QueryLike} from "./QueryLike.js";
import {QueryImpl} from "./QueryImpl.js";

class WhereClause extends QueryLike {

    #whereClause;
    #params;

    constructor(whereClause, params) {
        super();
        this.#whereClause = whereClause;
        this.#params = params;
    }

    /**
     * 拼接
     *
     * @param other a
     * @return WhereClause
     */
    concat(other) {
        return new WhereClause(this.#whereClause.concat(other.#whereClause), this.#params.concat(other.params));
    }

    isEmpty() {
        return (this.#whereClause == null || this.#whereClause.isEmpty()) && (this.#params == null || this.#params.length === 0);
    }

    whereClause() {
        return this.#whereClause;
    }

    params() {
        return this.#params;
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {WhereClause};
