import {FieldFilter} from "../FieldFilter.js";

class FieldFilterSerializer {

    serialize(obj) {
        if (obj instanceof FieldFilter) {
            return this.serializeFieldFilter(obj);
        }
        return obj;
    }

    serializeFieldFilter(fieldFilter) {
        return {
            "@type": "FieldFilter",
            "filterMode": fieldFilter.getFilterMode(),
            "fieldNames": fieldFilter.getFieldNames(),
            "ignoreNullValue": fieldFilter.getIgnoreNullValue(),
        };
    }

}

const FIELD_FILTER_SERIALIZER = new FieldFilterSerializer();

export {
    FIELD_FILTER_SERIALIZER,
    FieldFilterSerializer,
};
