import {LimitInfo} from "../LimitInfo.js";

class LimitInfoSerializer {

    serialize(obj) {
        if (obj instanceof LimitInfo) {
            return this.serializeLimitInfo(obj);
        }
        return null;
    }

    serializeLimitInfo(limitInfo) {
        return {
            "@type": "LimitInfo",
            "offset": limitInfo.getOffset(),
            "limit": limitInfo.getLimit(),
        };
    }

}

export {
    LimitInfoSerializer,
};
