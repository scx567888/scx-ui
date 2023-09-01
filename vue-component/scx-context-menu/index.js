import ScxContextMenu from "./index.vue";
import {h, render} from "vue";

// 这里因为 vite 每次导入时都使用不同的 上下文导致 contextMenuInstance 为空 这里直接绑定到 window 上
// let contextMenuInstance;

function getInstance() {
    return window["__SCX_CONTEXT_MENU_INSTANCE__"];
}

function setInstance(instance) {
    return window["__SCX_CONTEXT_MENU_INSTANCE__"] = instance;
}

function bodyClick(e) {
    let isOnContextmenu = e.target.closest(".scx-context-menu");

    if (!isOnContextmenu && getInstance()) {
        closeContextMenu();
    }
}

function showContextMenu(e, value) {
    //默认阻止事件冒泡
    e.stopPropagation();
    const instance = getInstance();
    if (instance) {
        document.body.removeChild(instance);
    }
    const container = document.createElement("div");
    let vm = h(ScxContextMenu, {
        mouseEvent: e,
        contextMenuItems: value,
    });
    render(vm, container);
    setInstance(container);
    document.body.appendChild(container);
    document.body.addEventListener("click", bodyClick);
}

function closeContextMenu() {
    document.body.removeChild(getInstance());
    setInstance(null);
    document.body.removeEventListener("click", bodyClick);
}

const ScxContextMenuDirective = {
    name: "contextmenu",
    //待处理
    mounted(el, {value}) {
        el.oncontextmenu = (e) => {
            showContextMenu(e, value);
            return false;
        };
    },
    updated(el, {value}) {

    },
};

export {
    ScxContextMenuDirective,
    showContextMenu,
    closeContextMenu,
};
