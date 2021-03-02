import Layout from '/@/layout/index.vue'

export default {
    path: '/teacher-manage',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'teacherManage',
    icon: 'peoples',
    children: [
        {
            path: 'teacher-manage',
            component: () => import('/@/views/bole/teacherManage/teacherManage.vue'),
            name: 'teacherManage',
            perms: [
                {
                    id: 'TeacherManage:list',
                    label: 'list'
                },
                {
                    id: 'TeacherManage:info',
                    label: 'info'
                },
                {
                    id: 'TeacherManage:save',
                    label: 'save'
                },
                {
                    id: 'TeacherManage:update',
                    label: 'update'
                },
                {
                    id: 'TeacherManage:delete',
                    label: 'delete'
                },
                {
                    id: 'TeacherManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'TeacherManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
    ]
}
