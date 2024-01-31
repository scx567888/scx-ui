import {inject} from "vue";

/**
 *
 * @type {string}
 */
const scxFetchKey = "scx-fetch";

/**
 *
 * @returns {ScxFetch}
 */
function useScxFetch() {
    return inject(scxFetchKey);
}

class ScxFetchVueInstaller {

    scxFetch;

    constructor(scxFetch) {
        this.scxFetch = scxFetch;
    }

    install(app) {
        app.provide(scxFetchKey, this.scxFetch);
    }
}

export {ScxFetchVueInstaller, useScxFetch};
