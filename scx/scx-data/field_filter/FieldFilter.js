class FieldFilter {

    addIncluded(...fieldNames) {
        return this;
    }

    addExcluded(...fieldNames) {
        return this;
    }

    removeIncluded(...fieldNames) {
        return this;
    }

    removeExcluded(...fieldNames) {
        return this;
    }

    ignoreNullValue(ignoreNullValue) {
        return this;
    }

    getFilterMode() {
    }

    getFieldNames() {
    }

    getIgnoreNullValue() {
    }

    clear() {
        return this;
    }

}

export {
    FieldFilter,
};
