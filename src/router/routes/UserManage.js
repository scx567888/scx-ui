import Layout from '/@/layout/index.vue'

export default {
    path: '/user',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'userManage',
    icon: 'cooperate',
    children: [
        {
            path: 'user-manage',
            component: () => import('/@/views/core/user/userManage.vue'),
            name: 'userManage',
            perms: [
                {
                    id: 'User:list',
                    label: 'list'
                },
                {
                    id: 'User:info',
                    label: 'info'
                },
                {
                    id: 'User:save',
                    label: 'save'
                },
                {
                    id: 'User:update',
                    label: 'update'
                },
                {
                    id: 'User:delete',
                    label: 'delete'
                },
                {
                    id: 'User:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'User:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
        {
            path: 'student-manage',
            component: () => import('/@/views/reson/userManage/studentManage.vue'),
            name: 'studentManage',
            perms: [
                {
                    id: 'Student:list',
                    label: 'list'
                },
                {
                    id: 'Student:info',
                    label: 'info'
                },
                {
                    id: 'Student:save',
                    label: 'save'
                },
                {
                    id: 'Student:update',
                    label: 'update'
                },
                {
                    id: 'Student:delete',
                    label: 'delete'
                },
                {
                    id: 'Student:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'Student:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        }
    ]
}
