import {Logic} from "./Logic.js";
import {_OR} from "./LogicType.js";
import {QueryImpl} from "./QueryImpl.js";

class OR extends Logic {

    #clauses;

    constructor(clauses) {
        super();
        this.#clauses = clauses;
    }

    logicType() {
        return _OR;
    }

    clauses() {
        return this.#clauses;
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {OR};
