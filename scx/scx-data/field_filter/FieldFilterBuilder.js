import {IncludedFieldFilter} from "./IncludedFieldFilter.js";
import {ExcludedFieldFilter} from "./ExcludedFieldFilter.js";

/**
 *
 * @param fieldNames
 * @return {FieldFilter}
 */
function ofIncluded(...fieldNames) {
    return new IncludedFieldFilter().addIncluded(...fieldNames);
}

/**
 *
 * @param fieldNames
 * @return {FieldFilter}
 */
function ofExcluded(...fieldNames) {
    return new ExcludedFieldFilter().addExcluded(...fieldNames);
}

export {
    ofIncluded,
    ofExcluded,
};
