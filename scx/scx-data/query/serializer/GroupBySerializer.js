import {Query} from "../Query.js";
import {isArray} from "../../../../util/index.js";
import {GroupBy} from "../GroupBy.js";

class GroupBySerializer {

    serialize(obj) {
        if (obj instanceof String) {
            return this.serializeString(obj);
        }
        if (obj instanceof GroupBy) {
            return this.serializeGroupBy(obj);
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

    serializeGroupBy(w) {
        return {
            "@type": "GroupBy",
            "name": w.name(),
            "info": w.info(),
        };
    }

    serializeQuery(w) {
        return this.serializeAll(w.getGroupBy());
    }


    serializeAll(objs) {
        const arr = [];
        for (let i = 0; i < objs.length; i = i + 1) {
            arr[i] = this.serialize(objs[i]);
        }
        return arr;
    }

}

export {GroupBySerializer};
