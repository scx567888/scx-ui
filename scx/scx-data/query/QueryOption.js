class QueryOption {

    #value;

    constructor(value) {
        this.#value = value;
    }


}

const REPLACE = new QueryOption("REPLACE");
const SKIP_IF_NULL = new QueryOption("SKIP_IF_NULL");
const SKIP_IF_EMPTY_LIST = new QueryOption("SKIP_IF_EMPTY_LIST");
const USE_ORIGINAL_NAME = new QueryOption("USE_ORIGINAL_NAME");
const USE_JSON_EXTRACT = new QueryOption("USE_JSON_EXTRACT");
const USE_ORIGINAL_VALUE = new QueryOption("USE_ORIGINAL_VALUE");

function ofInfo(...queryOptions) {
    let replace = false;
    let skipIfNull = false;
    let skipIfEmptyList = false;
    let useOriginalName = false;
    let useJsonExtract = false;
    let useOriginalValue = false;
    for (let option of queryOptions) {
        if (option === REPLACE) {
            replace = true;
        } else if (option === SKIP_IF_NULL) {
            skipIfNull = true;
        } else if (option === SKIP_IF_EMPTY_LIST) {
            skipIfEmptyList = true;
        } else if (option === USE_ORIGINAL_NAME) {
            useOriginalName = true;
        } else if (option === USE_JSON_EXTRACT) {
            useJsonExtract = true;
        } else if (option === USE_ORIGINAL_VALUE) {
            useOriginalValue = true;
        }
    }
    return new Info(replace, skipIfNull, skipIfEmptyList, useOriginalName, useJsonExtract, useOriginalValue);
}

class Info {
    replace;
    skipIfNull;
    skipIfEmptyList;
    useOriginalName;
    useJsonExtract;
    useOriginalValue;


    constructor(replace, skipIfNull, skipIfEmptyList, useOriginalName, useJsonExtract, useOriginalValue) {
        this.replace = replace;
        this.skipIfNull = skipIfNull;
        this.skipIfEmptyList = skipIfEmptyList;
        this.useOriginalName = useOriginalName;
        this.useJsonExtract = useJsonExtract;
        this.useOriginalValue = useOriginalValue;
    }

}

export {
    QueryOption,
    REPLACE,
    SKIP_IF_NULL,
    SKIP_IF_EMPTY_LIST,
    USE_ORIGINAL_NAME,
    USE_JSON_EXTRACT,
    USE_ORIGINAL_VALUE,
    Info,
    ofInfo,
};
