import {Query} from "../Query.js";
import {isArray} from "../../../../util/index.js";
import {OrderBy} from "../OrderBy.js";

class OrderBySerializer {

    serialize(obj) {
        if (obj instanceof String) {
            return this.serializeString(obj);
        }
        if (obj instanceof OrderBy) {
            return this.serializeOrderBy(obj);
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

    serializeOrderBy(w) {
        return {
            "@type": "OrderBy",
            "name": w.name(),
            "orderByType": w.orderByType(),
            "info": w.info(),
        };
    }

    serializeQuery(w) {
        return this.serializeAll(w.getOrderBy());
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
    OrderBySerializer,
};
