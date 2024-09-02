import {EXCLUDED, INCLUDED} from "./FilterMode.js";
import {FieldFilter} from "./FieldFilter.js";

class FieldFilterImpl extends FieldFilter {

    #filterMode;
    #fieldNames;
    #ignoreNullValue;

    constructor(filterMode) {
        super();
        this.#filterMode = filterMode;
        this.#fieldNames = new Set();
        this.#ignoreNullValue = true;
    }

    addIncluded(...fieldNames) {
        if (this.#filterMode === INCLUDED) {
            this.addFieldNames(...fieldNames);
        } else if (this.#filterMode === EXCLUDED) {
            this.removeFieldNames(...fieldNames);
        }
        return this;
    }

    addExcluded(...fieldNames) {
        if (this.#filterMode === EXCLUDED) {
            this.addFieldNames(...fieldNames);
        } else if (this.#filterMode === INCLUDED) {
            this.removeFieldNames(...fieldNames);
        }
        return this;
    }

    removeIncluded(...fieldNames) {
        return this.addExcluded(...fieldNames);
    }

    removeExcluded(...fieldNames) {
        return this.addIncluded(...fieldNames);
    }

    ignoreNullValue(ignoreNullValue) {
        this.#ignoreNullValue = ignoreNullValue;
        return this;
    }

    getFilterMode() {
        return this.#filterMode;
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

    addFieldNames(...fieldNames) {
        for (let fieldName of fieldNames) {
            this.#fieldNames.add(fieldName);
        }
        return this;
    }

    removeFieldNames(...fieldNames) {
        for (let fieldName of fieldNames) {
            this.#fieldNames.delete(fieldName);
        }
        return this;
    }

}

export {FieldFilterImpl};
