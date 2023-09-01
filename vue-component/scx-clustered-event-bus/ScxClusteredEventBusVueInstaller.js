import {inject} from "vue";

/**
 *
 * @type {string}
 */
const scxClusteredEventBusKey = "scx-clustered-event-bus";

/**
 *
 * @returns {ScxClusteredEventBus}
 */
function useScxClusteredEventBus() {
    return inject(scxClusteredEventBusKey);
}

class ScxClusteredEventBusVueInstaller {

    scxClusteredEventBus;

    constructor(scxClusteredEventBus) {
        this.scxClusteredEventBus = scxClusteredEventBus;
    }

    install(app) {
        app.provide(scxClusteredEventBusKey, this.scxClusteredEventBus);
    }

}

export {
    ScxClusteredEventBusVueInstaller,
    scxClusteredEventBusKey,
    useScxClusteredEventBus,
};
