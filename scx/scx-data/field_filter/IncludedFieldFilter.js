import {INCLUDED} from "./FilterMode.js";
import {FieldFilter} from "../FieldFilter.js";

class IncludedFieldFilter extends FieldFilter {

    #fieldNames;
    #ignoreNullValue;

    constructor() {
        super();
        this.#fieldNames = new Set();
        this.#ignoreNullValue = true;
    }

    addIncluded(fieldNames) {
        return this._addFieldNames(fieldNames);
    }

    addExcluded(fieldNames) {
        return this._removeFieldNames(fieldNames);
    }

    removeIncluded(fieldNames) {
        return this._addFieldNames(fieldNames);
    }

    removeExcluded(fieldNames) {
        return this._removeFieldNames(fieldNames);
    }

    ignoreNullValue(ignoreNullValue) {
        this.#ignoreNullValue = ignoreNullValue;
        return this;
    }

    getFilterMode() {
        return INCLUDED;
    }

    getFieldNames() {
        return this.#fieldNames.toArray();
    }

    getIgnoreNullValue() {
        return this.#ignoreNullValue;
    }

    clear() {
        this.#fieldNames.clear();
        return this;
    }

    _addFieldNames(fieldNames) {
        this.#fieldNames.add(fieldNames);
        return this;
    }

    _removeFieldNames(fieldNames) {
        for (let fieldName of fieldNames) {
            this.#fieldNames.remove(fieldName);
        }
        return this;
    }

}

export {IncludedFieldFilter};
