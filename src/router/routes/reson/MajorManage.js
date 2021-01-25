import Layout from '/@/layout/index.vue'

export default {
    path: '/major-manage',
    component: Layout,
    redirect: '/major-manage/major-info-manage',
    alwaysShow: true, //总在根目录显示
    name: 'majorManage',
    icon: 'business-affairs',
    children: [
        {
            path: 'major-info-manage',
            component: () => import('/@/views/reson/majorManage/majorInfoManage.vue'),
            name: 'majorInfoManage',
            perms: []
        }, {
            path: 'course-info-manage',
            component: () => import('/@/views/reson/majorManage/courseInfoManage.vue'),
            name: 'courseInfoManage',
            perms: []
        },
        {
            path: 'semester-info-manage',
            component: () => import('/@/views/reson/majorManage/semesterInfoManage.vue'),
            name: 'semesterInfoManage',
            perms: []
        }, {
            path: 'class-info-manage',
            component: () => import('/@/views/reson/majorManage/classInfoManage.vue'),
            name: 'classInfoManage',
            perms: []
        }
    ]
}
