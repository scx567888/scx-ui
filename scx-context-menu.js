import ScxContextMenu from "./_scx-context-menu/index.vue";
import {h, render} from "vue";

let contextMenuInstance;

function bodyClick(e) {
    let isOnContextmenu = e.target.closest('.scx-context-menu');

    if (!isOnContextmenu && contextMenuInstance) {
        closeContextMenu();
    }
}

function showContextMenu(e, value) {
    //默认阻止事件冒泡
    e.stopPropagation();
    if (contextMenuInstance) {
        document.body.removeChild(contextMenuInstance)
    }
    const container = document.createElement('div')
    let vm = h(ScxContextMenu, {
        mouseEvent: e,
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