import {scxUserInfoKey} from "../scx-user-info/ScxUserInfoVueInstaller.js";
import {watch} from "vue";

let appContext = null;

function getUserInfo() {
    return appContext.provides[scxUserInfoKey];
}

function hasPerm(value) {
    const userInfo = getUserInfo();
    if (userInfo) {
        if (userInfo.isAdmin) { // 管理员返回 true
            return true;
        } else if (Array.isArray(value)) { //数组类型
            return userInfo.pageElementPerms.some(role => value.includes(role));
        } else { //其他类型
            return userInfo.pageElementPerms.includes(value);
        }
    }
    return false;
}

// 当 v-perm 和 v-if 同时使用时 会多次执行 mounted 导致多次监听
// 这里 使用 map 存储一下 然后在 unmounted 事件中销毁 watch 监听事件
const watchEventMap = new Map();

function doWatch(el, {value}, vnode) {
    // 创建 注释标签用来占位
    const comment = document.createComment("v-perm");
    const parentNode = el.parentNode;
    if (parentNode) {
        const watchEvent = watch(getUserInfo(), () => {
            if (hasPerm(value)) {
                if (parentNode.contains(comment)) {
                    parentNode.replaceChild(el, comment);
                    vnode.el = el;
                }
            } else {
                if (parentNode.contains(el)) {
                    parentNode.replaceChild(comment, el);
                    vnode.el = comment;
                }
            }
        }, {
            immediate: true,
            deep: true
        });
        watchEventMap.set(el, watchEvent);
    }
}

function unWatch(el) {
    const watchEvent = watchEventMap.get(el);
    if (watchEvent) {
        watchEvent();
        watchEventMap.delete(el);
    }
}

/**
 * 注意 同时和 v-if 使用可能会造成错误
 * 如需要同时使用 建议在外层 套一层 div 并将 v-if 放在外层 v-perm 放在内存
 * 如果非要再同一层级使用 v-if 可以直接使用 hasPerm 方法
 * @type {{unmounted: unWatch, name: string, mounted: doWatch}}
 */
const scxPerm = {
    name: "perm",
    mounted: doWatch,
    unmounted: unWatch,
};

function createScxPermDirective(app) {
    appContext = app._context;
    return scxPerm;
}

export {
    createScxPermDirective, hasPerm,
};
