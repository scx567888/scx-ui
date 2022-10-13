import {useScxDrag} from "./_scx-drag/index.js";

const ScxDragDirective = {
    name: 'drag',
    mounted(el, {value}) {
        useScxDrag(el, value);
    },
    updated(el, {value}) {

    }
}

export {ScxDragDirective}