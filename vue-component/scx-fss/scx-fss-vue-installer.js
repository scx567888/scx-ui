import {inject} from "vue";

/**
 *
 * @type {string}
 */
const scxFSSKey = "scx-fss";

/**
 *
 * @returns {ScxFSS}
 */
function useScxFSS() {
    return inject(scxFSSKey);
}

class ScxFSSVueInstaller {

    scxFSS;

    constructor(scxFSS) {
        this.scxFSS = scxFSS;
    }

    install(app) {
        app.provide(scxFSSKey, this.scxFSS);
    }
}

export {ScxFSSVueInstaller, scxFSSKey, useScxFSS};
