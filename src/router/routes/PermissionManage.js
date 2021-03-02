import Layout from '/@/layout/index.vue'

export default {
    path: '/permission-manage',
    component: Layout,
    redirect: '/permission-manage/role-manage',
    alwaysShow: true, //总在根目录显示
    name: 'permissionManage',
    icon: 'lock',
    children: [
        {
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
            path: 'log-manage',
            component: () => import('/@/views/core/permission/logManage.vue'),
            name: 'logManage',
            perms: []
        }
    ]
}
