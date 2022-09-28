import {inject} from "vue";

/**
 *
 * @type {string}
 */
const scxUserInfoKey = 'scx-user-info';

/**
 *
 * @returns {ScxUserInfo}
 */
function useScxUserInfo() {
    return inject(scxUserInfoKey);
}

class ScxUserInfoVueInstaller {

    scxUserInfo;

    constructor(scxUserInfo) {
        this.scxUserInfo = scxUserInfo;
    }

    install(app) {
        app.provide(scxUserInfoKey, this.scxUserInfo);
    }
}

export {ScxUserInfoVueInstaller, useScxUserInfo, scxUserInfoKey}