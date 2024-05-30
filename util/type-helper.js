function isString(s) {
    return typeof s === "string" || s instanceof String;
}

function isNumber(n) {
    return typeof n === "number" || n instanceof Number;
}

function isFunction(f) {
    return typeof f === "function" || f instanceof Function;
}

function isObject(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
}

function isArray(value) {
    return Array.isArray(value);
}

export {
    isFunction,
    isString,
    isObject,
    isNumber,
    isArray,
};
