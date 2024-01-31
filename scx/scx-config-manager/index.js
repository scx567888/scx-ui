const ON_SCX_SYSTEM_CONFIG_CHANGE_EVENT_NAME = "onScxSystemConfigChange";
const ON_SCX_USER_CONFIG_CHANGE_EVENT_NAME = "onScxUserConfigChange";

/**
 * 配置管理器
 */
class ScxConfigManager {

    req;

    /**
     * @type {ScxClusteredEventBus}
     */
    eventBus;

    systemConfig;

    userConfig;

    /**
     *
     * @param req {ScxReq}
     * @param eventBus {ScxClusteredEventBus}
     * @param systemConfig {Object}
     * @param userConfig {Object}
     */
    constructor(req, eventBus, systemConfig, userConfig) {
        this.req = req;
        this.eventBus = eventBus;
        this.systemConfig = systemConfig;
        this.userConfig = userConfig;
    }

    startWatch() {
        this.eventBus.addClusteredHandler(ON_SCX_USER_CONFIG_CHANGE_EVENT_NAME, (data) => {
            Object.assign(this.userConfig, data);
            this.eventBus.publish(ON_SCX_USER_CONFIG_CHANGE_EVENT_NAME, this.userConfig);
        });
        this.eventBus.addClusteredHandler(ON_SCX_SYSTEM_CONFIG_CHANGE_EVENT_NAME, (data) => {
            Object.assign(this.systemConfig, data);
            this.eventBus.publish(ON_SCX_SYSTEM_CONFIG_CHANGE_EVENT_NAME, this.systemConfig);
        });
        return this;
    }

    onSystemConfigChange(event) {
        this.eventBus.addHandler(ON_SCX_SYSTEM_CONFIG_CHANGE_EVENT_NAME, event);
        return this;
    }

    onUserConfigChange(event) {
        this.eventBus.addHandler(ON_SCX_USER_CONFIG_CHANGE_EVENT_NAME, event);
        return this;
    }

    updateSystemConfig(newSystemConfig) {
        return this.req.put("api/system-config", newSystemConfig);
    }

    updateUserConfig(newUserConfig) {
        return this.req.put("api/user-config", newUserConfig);
    }

}

export {
    ScxConfigManager,
};
