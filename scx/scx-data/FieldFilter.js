import {ExcludedFieldFilter} from "./ExcludedFieldFilter.js";
import {IncludedFieldFilter} from "./IncludedFieldFilter.js";

class FieldFilter {

    addIncluded(fieldNames) {

    }

    addExcluded(fieldNames) {

    }

    removeIncluded(fieldNames) {

    }

    removeExcluded(fieldNames) {

    }

    ignoreNullValue(ignoreNullValue) {

    }

    getFilterMode() {

    }

    getFieldNames() {

    }

    getIgnoreNullValue() {

    }
    
    clear() {

    }

}

function ofIncluded(fieldNames) {
    return new IncludedFieldFilter().addIncluded(fieldNames);
}

function ofExcluded(fieldNames) {
    return new ExcludedFieldFilter().addExcluded(fieldNames);
}

export {
    ofIncluded,
    ofExcluded,
    FieldFilter,
};
