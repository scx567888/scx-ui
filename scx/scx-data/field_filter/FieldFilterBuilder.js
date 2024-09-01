import {IncludedFieldFilter} from "./IncludedFieldFilter.js";
import {ExcludedFieldFilter} from "./ExcludedFieldFilter.js";

function ofIncluded(fieldNames) {
    return new IncludedFieldFilter().addIncluded(fieldNames);
}

function ofExcluded(fieldNames) {
    return new ExcludedFieldFilter().addExcluded(fieldNames);
}

export {
    ofIncluded,
    ofExcluded,
};
