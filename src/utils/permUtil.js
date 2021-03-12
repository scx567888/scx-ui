// user login
import request from "./request";
import {asyncRoutes, BaseRoutes,  resetRouter} from "../router";
import {state} from "../store";
import scxConfig from "../../scx.config";
import {delAllViews} from "./tagViewUtil";

function getToken() {
    return sessionStorage.getItem('S-Token')
}

function setToken(token) {
    sessionStorage.setItem('S-Token', token)
}

function removeToken() {
    sessionStorage.removeItem('S-Token')
}

function setUserState({userId, nickName, avatar, perms, realName, realDelete}) {
    state.user.userId = userId
    state.user.nickName = nickName
    state.user.avatar = scxConfig.baseApi + '/api/showPicture/' + avatar + '?w=200&h=200'
    state.user.perms = perms;
    state.user.realName = realName;
    state.user.realDelete = realDelete
}

function removeUserState() {
    state.user.userId = '';
    state.user.nickName = '';
    state.user.avatar = '';
    state.user.perms = [];
    state.user.realName = '';
    state.user.realDelete = false;
}

function login({username, password}) {
    return new Promise((resolve, reject) => {
        request.post('/api/user/login', {username: username.trim(), password: password}).then(response => {
            const {token} = response
            setToken(token);
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

// get user info
function getUserInfo() {
    return new Promise((resolve, reject) => {
        request.get('/api/user/info/' + getToken()).then(data => {
            if (!data) {
                reject('登录错误 , 请重新登录 !!!')
            }
            setUserState(data)
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

// user logout
function logout() {
    return new Promise((resolve, reject) => {
        request.post('/api/user/logout').then(() => {
            removeToken();
            removeUserState();
            resetRouter();
            delAllViews();
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}


function hasPermission(perms, route) {
    if (route.path) {
        return perms.some(() => perms.includes(route.path))
    } else {
        return true
    }
}

function filterAsyncRoutes(routes, perms) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(perms, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, perms)
            }
            res.push(tmp)
        }
    })
    return res
}


function getFilteredAsyncRoutes(perms) {
    return new Promise(resolve => {
        let accessedRoutes
        if (perms.includes('*')) {
            accessedRoutes = asyncRoutes || []
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, perms);
            accessedRoutes.push({path: '*', redirect: '/dashboard', hidden: true});
        }
        state.permission.addRoutes = accessedRoutes
        state.permission.routes = BaseRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
    })
}


function getPermTreeData() {
    let perm = {
        id: -1,
        label: '权限详情',
        children: [
            {
                id: '/dashboard',
                label: 'dashboard',
                icon: 'dashboard',
                children: []
            }
            ,

        ]
    };


    let myPermission = JSON.parse(JSON.stringify(perm));

    f(myPermission);

    function f(p) {
        //第一层进来 这里已经有了 就不需要处理了
        if (p.id && p.label) {

        } else {
            p.id = p.path
            p.label = p.name
            try {
                p.icon = p.meta.icon
            } catch (e) {

            }
        }
        //属于有子节点
        if (p.children) {
            for (let key in p.children) {
                f(p.children[key])
            }
        } else//没有子节点 属于最后的一个叶子节点了
        {
            p.children = p.perms
        }
    }

    return [myPermission]

}

export {
    login,
    getUserInfo,
    logout,
    getToken,
    removeUserState,
    removeToken,
    getFilteredAsyncRoutes,
    getPermTreeData
}
