import {getScxRouter} from "./factory";
import scxConfig from "../../scx.config";
//最基础路由
import BaseRoutes from './routes/Base'
//用户管理
import AttendRoutes from './routes/attend/index'
import BoleRoutes from './routes/bole/index'
import CmsRoutes from './routes/cms/index'
import CoreRoutes from './routes/core/index'
import ImsRoutes from './routes/ims/index'
import ResonRoutes from './routes/reson/index'
import WorkFlowRoutes from './routes/workflow/index'

const RoutesModules = [CoreRoutes, AttendRoutes, BoleRoutes, CmsRoutes, ImsRoutes, ResonRoutes, WorkFlowRoutes];


//获取项目的最基础路由
const scxRouter = getScxRouter(BaseRoutes);

function resetRouter() {

}

function getOpenModules() {
    let openModules = [];
    RoutesModules.filter(rm => scxConfig.openModule[0] === '*' || scxConfig.openModule.includes(rm.name)).forEach(r => {
        openModules = openModules.concat(...r.modules);
    });
    return openModules;
}

/**
 * 需要根据用户角色动态加载的路由
 */
const asyncRoutes = [
    ...getOpenModules(),
    // 正常这里是 404 页面 但是根据需求我们把错误页面全部重定向到首页
    //todo vue-router 新版本此处配置有变动
    {path: '/:pathMatch(.*)*', component: () => import('/@/views/attend/attendanceList.vue'), hidden: true}
]


export {scxRouter, BaseRoutes, asyncRoutes, resetRouter, getOpenModules}