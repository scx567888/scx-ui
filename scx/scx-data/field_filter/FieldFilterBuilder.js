import {FieldFilterImpl} from "./FieldFilterImpl.js";
import {EXCLUDED, INCLUDED} from "./FilterMode.js";

/**
 *
 * @param fieldNames
 * @return {FieldFilter}
 */
function ofIncluded(...fieldNames) {
    return new FieldFilterImpl(INCLUDED).addIncluded(...fieldNames);
}

/**
 *
 * @param fieldNames
 * @return {FieldFilter}
 */
function ofExcluded(...fieldNames) {
    return new FieldFilterImpl(EXCLUDED).addExcluded(...fieldNames);
}

export {
    ofIncluded,
    ofExcluded,
};
