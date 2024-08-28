import {Logic} from "./Logic.js";
import {_AND} from "./LogicType.js";
import {QueryImpl} from "./QueryImpl.js";

class AND extends Logic {

    #clauses;

    constructor(clauses) {
        super();
        this.#clauses = clauses;
    }

    logicType() {
        return _AND;
    }

    clauses() {
        return this.#clauses;
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {AND};
