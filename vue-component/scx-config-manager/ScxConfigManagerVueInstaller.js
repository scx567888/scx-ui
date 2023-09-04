import {inject} from "vue";

/**
 *
 * @type {string}
 */
const scxSystemConfigKey = "scx-system-config";

/**
 *
 * @type {string}
 */
const scxUserConfigKey = "scx-user-config";

/**
 * a
 * @type {string}
 */
const scxConfigManagerKey = "scx-config-manager";

/**
 * 配置管理器
 */
class ScxConfigManagerVueInstaller {

    scxConfigManager;

    constructor(scxConfigManager) {
        this.scxConfigManager = scxConfigManager;
    }

    install(app) {
        app.provide(scxConfigManagerKey, this.scxConfigManager);
        app.provide(scxSystemConfigKey, this.scxConfigManager.systemConfig);
        app.provide(scxUserConfigKey, this.scxConfigManager.userConfig);
    }

}


/**
 *
 * @returns {Object}
 */
function useScxSystemConfig() {
    return inject(scxSystemConfigKey);
}

/**
 *
 * @returns {Object}
 */
function useScxUserConfig() {
    return inject(scxUserConfigKey);
}


/**
 *
 * @return {ScxConfigManager}
 */
function useScxConfigManager() {
    return inject(scxConfigManagerKey);
}

export {
    ScxConfigManagerVueInstaller,
    useScxSystemConfig,
    useScxUserConfig,
    useScxConfigManager,
};
