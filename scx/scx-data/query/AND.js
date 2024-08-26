import {Logic} from "./Logic.js";
import {_AND} from "./LogicType.js";
import {QueryImpl} from "./QueryImpl.js";

class AND extends Logic {

    _clauses;

    constructor(clauses) {
        super();
        this._clauses = clauses;
    }

    logicType() {
        return _AND;
    }

    clauses() {
        return this._clauses;
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {AND};
