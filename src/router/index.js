import {getScxRouter} from "./factory";
import scxConfig from "../../scx.config";
//最基础路由
import BaseRoutes from './routes/Base'
//用户管理
import Activity from './routes/Activity'
import Cms from './routes/Cms'
import Course from './routes/Course'
import EducationalManage from './routes/EducationalManage'
import Teacher from './routes/Teacher'
import UserManage from './routes/UserManage'
import System from './routes/System'
import StoreManage from './routes/StoreManage'
import PermissionManage from './routes/PermissionManage'
import OrganizationManage from './routes/OrganizationManage'
import OrderCode from './routes/OrderCode'
import Merchant from './routes/Merchant'
import InstantMessaging from './routes/InstantMessaging'

//获取项目的最基础路由
const scxRouter = getScxRouter(BaseRoutes);

function resetRouter() {

}


/**
 * 需要根据用户角色动态加载的路由
 */
const asyncRoutes = [
    UserManage,
    PermissionManage,
    OrganizationManage,
    Cms,
    System,
    Activity,
    Course,
    EducationalManage,
    Teacher,
    StoreManage,
    OrderCode,
    Merchant,
    InstantMessaging,
    // 正常这里是 404 页面 但是根据需求我们把错误页面全部重定向到首页
    //todo vue-router 新版本此处配置有变动
    {path: '/:pathMatch(.*)*', component: () => import('/@/views/attend/attendanceList.vue'), hidden: true}
]


export {scxRouter, BaseRoutes, asyncRoutes, resetRouter}