import {inject} from "vue";

/**
 *
 * @type {Symbol}
 */
const scxReqKey = Symbol('scx-req');

/**
 *
 * @returns {ScxReq}
 */
function useScxReq() {
    return inject(scxReqKey);
}

class ScxReqVueInstall {

    scxReq;

    constructor(scxReq) {
        this.scxReq = scxReq;
    }

    install(app) {
        app.provide(scxReqKey, this.scxReq);
    }
}

export {ScxReqVueInstall, scxReqKey, useScxReq}