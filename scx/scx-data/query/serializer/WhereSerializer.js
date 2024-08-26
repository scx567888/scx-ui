import {Where} from "../Where.js";
import {isArray} from "../../../../util/index.js";
import {Query} from "../Query.js";
import {WhereClause} from "../WhereClause.js";
import {WhereBody} from "../WhereBody.js";
import {Logic} from "../Logic.js";

class WhereSerializer {

    serialize(obj) {
        if (obj instanceof Where) {
            return this.serializeWhere(obj);
        }
        if (obj instanceof Logic) {
            return this.serializeLogic(obj);
        }
        if (obj instanceof WhereClause) {
            return this.serializeWhereClause(obj);
        }
        if (obj instanceof WhereBody) {
            return this.serializeWhereBody(obj);
        }
        if (obj instanceof String) {
            return this.serializeString(obj);
        }
        if (isArray(obj)) {
            return this.serializeAll(obj);
        }
        if (obj instanceof Query) {
            return this.serializeWhere(obj.getWhere());
        }
        return obj;
    }

    serializeWhere(where) {
        return {
            "@type": "Where",
            "clauses": this.serialize(where.clauses()),
        };
    }

    serializeLogic(l) {
        return {
            "@type": "Logic",
            "logicType": l.logicType(),
            "clauses": this.serializeAll(l.clauses()),
        };
    }

    serializeWhereClause(w) {
        return {
            "@type": "WhereClause",
            "whereClause": w.whereClause(),
            "params": w.params(),
        };
    }

    serializeWhereBody(w) {
        return {
            "@type": "WhereBody",
            "name": w.name(),
            "whereType": w.whereType().value(),
            "value1": w.value1(),
            "value2": w.value2(),
        };
    }

    serializeString(str) {
        return str;
    }

    serializeAll(objs) {
        const arr = [];
        for (let i = 0; i < objs.length; i = i + 1) {
            arr[i] = this.serialize(objs[i]);
        }
        return arr;
    }

}

export {
    WhereSerializer,
};
