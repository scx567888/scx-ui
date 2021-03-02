import {getScxRouter} from "./factory";
import scxConfig from "../../scx.config";
//最基础路由
import BaseRoutes from './routes/Base'
//用户管理
import Bole from './routes/Bole'
import Cms from './routes/Cms'
import User from './routes/User'
import System from './routes/System'

//获取项目的最基础路由
const scxRouter = getScxRouter(BaseRoutes);

function resetRouter() {

}


/**
 * 需要根据用户角色动态加载的路由
 */
const asyncRoutes = [
    User,
    Cms,
    System,
    Bole,
    // 正常这里是 404 页面 但是根据需求我们把错误页面全部重定向到首页
    //todo vue-router 新版本此处配置有变动
    {path: '/:pathMatch(.*)*', component: () => import('/@/views/base/dashboard.vue'), hidden: true}
]


export {scxRouter, BaseRoutes, asyncRoutes, resetRouter}