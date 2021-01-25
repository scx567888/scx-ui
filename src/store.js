import {nextTick, reactive} from 'vue';
import scxConfig from "../scx.config";

const state = reactive({
    //页面设置
    setting: {
        theme: getSetting('theme'),
        tagsView: getSetting('tagsView'),
        sidebarLogo: getSetting('sidebarLogo'),
        lowSpecialEffect: getSetting('lowSpecialEffect'),
        layoutMode: getSetting('layoutMode'),
        sidebarStatus: getSetting('sidebarStatus'),
        language: getSetting('language'),
        size: getSetting('size'),
        mainTransitionAnimation: getSetting('mainTransitionAnimation')
    },
    tagsView: {
        visitedViews: [],
        cachedViews: []
    },
    user: {
        userId: '',
        nickName: '',
        avatar: '',
        perms: [],
        realName: '',
        realDelete: false
    },
    permission: {
        routes: [],
        addRoutes: []
    },
    isAppMainAlive: true
});


//从localStorage中获取 设置 如果没有则设置为默认值 并返回
function getSetting(itemName) {
    const itemValue = localStorage.getItem(itemName);
    if (itemValue !== '' && itemValue !== null) {
        //从 localStorage 中取出的是字符串 再次进行转换
        if (itemValue === 'true' || itemValue === 'false') {
            return itemValue === 'true'
        } else {
            return itemValue
        }
    } else {
        localStorage.setItem(itemName, scxConfig.defaultSetting[itemName]);
        return scxConfig.defaultSetting[itemName]
    }
}

//修改 setting 同时将设置保存到  localStorage 中
function changeSetting(itemName, value) {
    state.setting[itemName] = value
    localStorage.setItem(itemName, value);
    //对需要对页面做处理的属性进行修改
    if (itemName === 'theme') {
        if (value !== '') {
            document.documentElement.setAttribute('theme', value);
        } else {
            document.documentElement.removeAttribute('theme');
        }
    } else if (itemName === 'lowSpecialEffect') {
        if (value !== '') {
            document.documentElement.setAttribute('low-special-effect', value);
        } else {
            document.documentElement.removeAttribute('low-special-effect');
        }
    }
}

function reloadAppMain() {
    state.isAppMainAlive = !state.isAppMainAlive;
}

export {
    state,
    changeSetting,
    reloadAppMain
}