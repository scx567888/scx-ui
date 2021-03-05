import error from './modules/_scx/error'
import navbar from './modules/_scx/navbar'
import route from './modules/_scx/route'
import setting from './modules/_scx/setting'
import tagsView from './modules/_scx/tagsView'
import table from './modules/_scx/table'
import login from './modules/base/login'
import user from './modules/user/user'
import Article from './modules/cms/Article'
import Column from './modules/cms/Column'
import ProjectNote from './modules/system/ProjectNote'
import Dic from './modules/system/Dic'
import MerchantManage from './modules/bole/Merchant'
import StoreManage from './modules/bole/Store'
import SubjectManage from "./modules/bole/SubjectManage"
import TeacherManage from './modules/bole/Teacher'
import CourseManage from './modules/bole/Course'
import ActivityManage from './modules/bole/Activity'
import OrderCodeManage from './modules/bole/OrderCode'
//todo 等待 vite 添加类似 require.context 的方法然后重构此模块
const modules = {
    'error': error,
    'login': login,
    'navbar': navbar,
    'route': route,
    'setting': setting,
    'table': table,
    'tagsView': tagsView,
    'user': user,
    'Article': Article,
    'Column': Column,
    'Dic': Dic,
    'ProjectNote': ProjectNote,
    'MerchantManage': MerchantManage,
    'StoreManage': StoreManage,
    'TeacherManage': TeacherManage,
    'CourseManage': CourseManage,
    'ActivityManage': ActivityManage,
    'OrderCodeManage': OrderCodeManage,
    'SubjectManage':SubjectManage,
}

export default modules
