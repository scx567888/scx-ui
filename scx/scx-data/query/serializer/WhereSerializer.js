import {Where} from "../Where.js";
import {isArray} from "../../../../util/index.js";
import {Query} from "../../Query.js";
import {WhereClause} from "../WhereClause.js";
import {Logic} from "../Logic.js";

class WhereSerializer {

    serialize(obj) {
        if (obj instanceof String) {
            return this.serializeString(obj);
        }
        if (obj instanceof WhereClause) {
            return this.serializeWhereClause(obj);
        }
        if (obj instanceof Logic) {
            return this.serializeLogic(obj);
        }
        if (obj instanceof Where) {
            return this.serializeWhere(obj);
        }
        if (obj instanceof Query) {
            return this.serializeQuery(obj.getWhere());
        }
        if (isArray(obj)) {
            return this.serializeAll(obj);
        }
        return obj;
    }

    serializeString(str) {
        return str;
    }

    serializeWhereClause(w) {
        return {
            "@type": "WhereClause",
            "whereClause": w.whereClause(),
            "params": w.params(),
        };
    }

    serializeLogic(l) {
        return {
            "@type": "Logic",
            "logicType": l.logicType(),
            "clauses": this.serializeAll(l.clauses()),
        };
    }

    serializeWhere(w) {
        return {
            "@type": "Where",
            "name": w.name(),
            "whereType": w.whereType().value(),
            "value1": w.value1(),
            "value2": w.value2(),
        };
    }

    serializeQuery(w) {
        return this.serializeAll(w.getWhere());
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
