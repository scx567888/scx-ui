import {inject} from "vue";

/**
 *
 * @type {Symbol}
 */
const scxFSSKey = Symbol('scx-fss');

/**
 *
 * @returns {ScxFSS}
 */
function useScxFSS() {
    return inject(scxFSSKey);
}

class ScxFSSVueInstall {

    scxFSS;

    constructor(scxFSS) {
        this.scxFSS = scxFSS;
    }

    install(app) {
        app.provide(scxFSSKey, this.scxFSS);
    }
}

export {ScxFSSVueInstall, scxFSSKey, useScxFSS}