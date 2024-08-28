import {OrderBy} from "./OrderBy.js";
import {QueryImpl} from "./QueryImpl.js";
import {ASC, DESC} from "./OrderByType.js";

class OrderBySet {

    #clauses;

    constructor() {
        this.#clauses = [];
    }

    add(name, orderByType, options) {
        // 是否使用原始名称 (即不进行转义)
        let orderByBody = new OrderBy(name, orderByType, null);
        this.#clauses.push(orderByBody);
        return this;
    }

    asc(name, options) {
        return this.add(name, ASC, options);
    }

    desc(name, options) {
        return this.add(name, DESC, options);
    }

    remove(name) {
        return this;
    }

    clear() {
        this.#clauses.clear();
        return this;
    }

    clauses() {
        return this.#clauses;
    }

    toQuery() {
        return new QueryImpl().orderBy(this);
    }
    
}

export {OrderBySet}
