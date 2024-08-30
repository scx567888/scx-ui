import {IncludedFieldFilter} from "./field_filter/IncludedFieldFilter.js";
import {ExcludedFieldFilter} from "./field_filter/ExcludedFieldFilter.js";

function ofIncluded(fieldNames) {
    return new IncludedFieldFilter().addIncluded(fieldNames);
}

function ofExcluded(fieldNames) {
    return new ExcludedFieldFilter().addExcluded(fieldNames);
}

export {
    ofIncluded,
    ofExcluded
}
