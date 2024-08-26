import {Logic} from "./Logic.js";
import {_OR} from "./LogicType.js";
import {QueryImpl} from "./QueryImpl.js";

class OR extends Logic {

    _clauses;

    constructor(clauses) {
        super();
        this._clauses = clauses;
    }

    logicType() {
        return _OR;
    }

    clauses() {
        return this._clauses;
    }

    toQuery() {
        return new QueryImpl().where(this);
    }

}

export {OR};
