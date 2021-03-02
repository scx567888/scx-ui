import Layout from '/@/layout/index.vue'

export default {
    path: '/user',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'userManage',
    icon: 'cooperate',
    children: [
        {
            icon: 'cooperate',
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
            icon: 'lock',
            path: 'role-manage',
            component: () => import('/@/views/core/permission/roleManage.vue'),
            name: 'roleManage',
            perms: [
                {
                    id: 'Role:list',
                    label: 'list'
                },
                {
                    id: 'Role:info',
                    label: 'info'
                },
                {
                    id: 'Role:save',
                    label: 'save'
                },
                {
                    id: 'Role:update',
                    label: 'update'
                },
                {
                    id: 'Role:delete',
                    label: 'delete'
                },
                {
                    id: 'Role:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'Role:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
        {
            icon: 'tree',
            path: 'dept-manage',
            component: () => import('/@/views/core/organization/deptManage.vue'),
            name: 'deptManage',
            perms: [
                {
                    id: 'Dept:save',
                    label: 'save'
                },
                {
                    id: 'Dept:update',
                    label: 'update'
                },
                {
                    id: 'Dept:delete',
                    label: 'delete'
                },
            ]
        }
    ]
}
