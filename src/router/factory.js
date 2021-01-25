import {state} from '../store'
import {getPageTitle} from '../utils' // 获取 token
import {getFilteredAsyncRoutes, getToken, getUserInfo, removeToken, removeUserState} from '../utils/permUtil'
import {createRouter, createWebHashHistory} from "vue-router";

NProgress.configure({showSpinner: false}); // NProgress 配置项

const whiteList = ['/login']; // 不进行重定向的白名单

function getScxRouter(BaseRoutes) {
    const scxRouter = createRouter({
        history: createWebHashHistory(),
        routes: BaseRoutes
    });
    scxRouter.beforeEach(async (to, from) => {

        //重定向页面不加载滚动条 也不改变 title
        if (to.path !== "/redirect") {
            NProgress.start();
            document.title = getPageTitle(to.name);
        }

        if (getToken()) {// 确定用户是否已登录
            if (to.path === '/login') {
                // 如果已经用户已登陆 重定向到 首页
                NProgress.done()
                return {path: '/'};
            } else {
                //确定用户是否已通过 getInfo 获得权限 perms
                const hasPerms = state.user.perms.length > 0;
                if (hasPerms) {
                    return true
                } else {
                    try {
                        // 获取用户信息
                        //  perms 必须是一个数组! 类似: ['user','name']
                        const {perms} = await getUserInfo();
                        // 根据 perms 生成可访问的路由表
                        const filteredAsyncRoutes = await getFilteredAsyncRoutes(perms);
                        // 动态添加可访问的路由
                        filteredAsyncRoutes.forEach(r => scxRouter.addRoute(r));
                        // 设置 replace:true，这样导航就不会留下历史记录
                        return {...to, replace: true};
                    } catch (error) {
                        // 移除 token 并重定向至 登陆页面
                        await removeToken();
                        await removeUserState();
                        console.error(error || 'Has Error');
                        NProgress.done()
                        return {path: '/login', query: {redirect: to.fullPath}}

                    }
                }
            }
        } else {
            /* 未登录 */
            if (whiteList.includes(to.path)) {
                return true
            } else {
                NProgress.done()
                return {path: '/login', query: {redirect: to.fullPath}}
            }
        }
    })

    scxRouter.afterEach(() => {
        // 完成 progress bar 上方进度条
        NProgress.done()
    });

    return scxRouter;
}

export {getScxRouter}