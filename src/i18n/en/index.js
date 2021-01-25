import error from './modules/core/error'
import login from './modules/core/login'
import navbar from './modules/core/navbar'
import route from './modules/core/route'
import setting from './modules/core/setting'
import table from './modules/core/table'
import tagsView from './modules/core/tagsView'
import User from './modules/core/userManage/User'
import ProjectNote from './modules/reson/system/ProjectNote'
import MerchantManage from './modules/bole/MerchantManage'
import StoreManage from './modules/bole/StoreManage'
import TeacherManage from './modules/bole/TeacherManage'
import CourseManage from './modules/bole/CourseManage'
import ActivityManage from './modules/bole/ActivityManage'
import OrderCodeManage from './modules/bole/OrderCodeManage'

const modules = {
    'error': error,
    'login': login,
    'navbar': navbar,
    'route': route,
    'setting': setting,
    'table': table,
    'tagsView': tagsView,
    'User': User,
    'ProjectNote': ProjectNote,
    'MerchantManage': MerchantManage,
    'StoreManage': StoreManage,
    'TeacherManage': TeacherManage,
    'CourseManage': CourseManage,
    'ActivityManage': ActivityManage,
    'OrderCodeManage': OrderCodeManage,
}

export default modules
