import ScxContextMenu from "./index.vue";
import {createVNode, render} from "vue";

let contextMenuInstance;
let clickNoClose = false;

function bodyClick(e) {
    let isOnContextmenu = e.target.closest('.scx-contextmenu');

    if (!(isOnContextmenu && clickNoClose) && contextMenuInstance) {
        document.body.removeChild(contextMenuInstance)
        contextMenuInstance = null;
        document.body.removeEventListener('click', bodyClick);
    }
}

export function showContextMenu(e, value) {
    if (contextMenuInstance) {
        document.body.removeChild(contextMenuInstance)
    }
    clickNoClose = !!(value.configs && value.configs.clickNoClose);
    const container = document.createElement('div')
    let vm = createVNode(ScxContextMenu, Array.isArray(value) ?
        {
            x: e.clientX,
            y: e.clientY,
            itemList: value
        } :
        {
            x: e.clientX,
            y: e.clientY,
            itemList: value.itemList,
            configs: value.configs
        })
    render(vm, container)
    contextMenuInstance = container
    document.body.appendChild(container)
    document.body.addEventListener('click', bodyClick);
}

export default {
    name: 'contextmenu',
    //待处理
    mounted(el, {value}) {
        el.oncontextmenu = (e) => {
            showContextMenu(e, value)
            return false;
        };
    },
    updated(el, {value}) {

    }
}
