import {inject} from "vue";

/**
 *
 * @type {Symbol}
 */
const scxFetchKey = Symbol('scx-fetch');

/**
 *
 * @returns {ScxFetch}
 */
function useScxFetch() {
    return inject(scxFetchKey);
}

class ScxFetchVueInstall {

    scxFetch;

    constructor(scxFetch) {
        this.scxFetch = scxFetch;
    }

    install(app) {
        app.provide(scxFetchKey, this.scxFetch);
    }
}

export {ScxFetchVueInstall, useScxFetch}