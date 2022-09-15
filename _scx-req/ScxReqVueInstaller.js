import {inject} from "vue";

/**
 *
 * @type {string}
 */
const scxReqKey = 'scx-req';

/**
 *
 * @returns {ScxReq}
 */
function useScxReq() {
    return inject(scxReqKey);
}

class ScxReqVueInstaller {

    scxReq;

    constructor(scxReq) {
        this.scxReq = scxReq;
    }

    install(app) {
        app.provide(scxReqKey, this.scxReq);
    }
}

export {ScxReqVueInstaller, scxReqKey, useScxReq}