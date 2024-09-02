import {EXCLUDED} from "./FilterMode.js";
import {FieldFilter} from "./FieldFilter.js";

class ExcludedFieldFilter extends FieldFilter {

    #fieldNames;
    #ignoreNullValue;

    constructor() {
        super();
        this.#fieldNames = new Set();
        this.#ignoreNullValue = true;
    }

    addIncluded(...fieldNames) {
        return this._removeFieldNames(...fieldNames);
    }

    addExcluded(...fieldNames) {
        return this._addFieldNames(...fieldNames);
    }

    removeIncluded(...fieldNames) {
        return this._removeFieldNames(...fieldNames);
    }

    removeExcluded(...fieldNames) {
        return this._addFieldNames(...fieldNames);
    }

    ignoreNullValue(ignoreNullValue) {
        this.#ignoreNullValue = ignoreNullValue;
        return this;
    }

    getFilterMode() {
        return EXCLUDED;
    }

    getFieldNames() {
        return Array.from(this.#fieldNames);
    }

    getIgnoreNullValue() {
        return this.#ignoreNullValue;
    }

    clear() {
        this.#fieldNames.clear();
        return this;
    }

    _addFieldNames(...fieldNames) {
        for (let fieldName of fieldNames) {
            this.#fieldNames.add(fieldName);
        }
        return this;
    }

    _removeFieldNames(...fieldNames) {
        for (let fieldName of fieldNames) {
            this.#fieldNames.delete(fieldName);
        }
        return this;
    }

}

export {ExcludedFieldFilter};
