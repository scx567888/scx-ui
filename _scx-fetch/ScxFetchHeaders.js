class ScxFetchHeaders {

    fetchHeaders;

    /**
     *
     * @param {Headers} headers
     */
    constructor(headers) {
        this.fetchHeaders = headers;
    }

    get(name) {
        return this.fetchHeaders.get(name);
    };

    has(name) {
        return this.fetchHeaders.has(name);
    };

    forEach(callbackFun, thisArg) {
        return this.fetchHeaders.forEach(callbackFun, thisArg);
    };

}

export {ScxFetchHeaders}