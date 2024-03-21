import {onBeforeUnmount} from "vue";
import {ScxDrag} from "../../scx/index.js";

/**
 *
 * @param targetElement
 * @param options {{dragElement, callback, bounds}}}
 * @return {ScxDrag}
 */
function useScxDrag(targetElement, options = {}) {
    const scxDrag = new ScxDrag(targetElement, options);
    scxDrag.enable();
    onBeforeUnmount(() => scxDrag.disable());
    return scxDrag;
}

const ScxDragDirective = {
    name: "drag",
    mounted(el, {value}) {
        useScxDrag(el, value);
    },
    updated(el, {value}) {

    },
};

export {
    useScxDrag,
    ScxDragDirective,
};
