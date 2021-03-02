import Layout from '/@/layout/index.vue'

export default {
    path: '/course-manage',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'courseManage',
    icon: 'profile',
    children: [
        {
            path: 'course-manage',
            component: () => import('/@/views/bole/courseManage/courseManage.vue'),
            name: 'courseManage',
            perms: [
                {
                    id: 'CourseManage:list',
                    label: 'list'
                },
                {
                    id: 'CourseManage:info',
                    label: 'info'
                },
                {
                    id: 'CourseManage:save',
                    label: 'save'
                },
                {
                    id: 'CourseManage:update',
                    label: 'update'
                },
                {
                    id: 'CourseManage:delete',
                    label: 'delete'
                },
                {
                    id: 'CourseManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'CourseManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
    ]
}