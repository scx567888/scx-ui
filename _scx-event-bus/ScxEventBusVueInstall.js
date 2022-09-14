import {inject} from "vue";

/**
 *
 * @type {Symbol}
 */
const scxEventBusKey = Symbol('scx-event-bus');

/**
 *
 * @returns {ScxEventBus}
 */
function useScxEventBus() {
    return inject(scxEventBusKey);
}

class ScxEventBusVueInstall {

    scxEventBus;

    constructor(scxEventBus) {
        this.scxEventBus = scxEventBus;
    }

    install(app) {
        app.provide(scxEventBusKey, this.scxEventBus);
    }
}

export {ScxEventBusVueInstall, scxEventBusKey, useScxEventBus}