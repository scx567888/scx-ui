class ScxFetchHeaders {

    /**
     *
     * @param {Headers} headers
     */
    constructor(headers) {
        headers.forEach((k, v) => {
            this[k] = v;
        });
    }

    get(name) {
        return this[name];
    };

    has(name) {
        return this.hasOwnProperty(name);
    };

    forEach(callbackFun) {
        for (const [key, value] of Object.entries(this)) {
            callbackFun(key, value)
        }
    };

}

export {ScxFetchHeaders}