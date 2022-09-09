import ScxContextMenu from "./_scx-context-menu/index.vue";
import {h, render} from "vue";

let contextMenuInstance;

function bodyClick(e) {
    let isOnContextmenu = e.target.closest('.scx-contextmenu');

    if (!isOnContextmenu && contextMenuInstance) {
        closeContextMenu();
    }
}

function showContextMenu(e, value) {
    if (contextMenuInstance) {
        document.body.removeChild(contextMenuInstance)
    }
    const container = document.createElement('div')
    let vm = h(ScxContextMenu, {
        x: e.clientX,
        y: e.clientY,
        contextMenuItems: value
    })
    render(vm, container)
    contextMenuInstance = container
    document.body.appendChild(container)
    document.body.addEventListener('click', bodyClick);
}

function closeContextMenu() {
    document.body.removeChild(contextMenuInstance)
    contextMenuInstance = null;
    document.body.removeEventListener('click', bodyClick);
}

const ScxContextMenuDirective = {
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

export {
    ScxContextMenuDirective,
    showContextMenu,
    closeContextMenu
}