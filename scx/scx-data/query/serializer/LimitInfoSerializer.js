import {LimitInfo} from "../LimitInfo.js";

class LimitInfoSerializer {

    serialize(obj) {
        if (obj instanceof LimitInfo) {
            return this.serializeLimitInfo(s);
        }
        return null;
    }

    serializeLimitInfo(limitInfo) {
        let m = new Map();
        m.set("@type", "LimitInfo");
        m.set("offset", limitInfo.getOffset());
        m.set("limit", limitInfo.getLimit());
        return m;
    }

}
export {
    LimitInfoSerializer
}
