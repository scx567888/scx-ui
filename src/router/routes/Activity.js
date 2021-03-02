import Layout from '/@/layout/index.vue'

export default {
    path: '/activity-manage',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'activityManage',
    icon: 'alert',
    children: [
        {
            path: 'activity-manage',
            component: () => import('/@/views/bole/activityManage/activityManage.vue'),
            name: 'activityManage',
            perms: [
                {
                    id: 'ActivityManage:list',
                    label: 'list'
                },
                {
                    id: 'ActivityManage:info',
                    label: 'info'
                },
                {
                    id: 'ActivityManage:save',
                    label: 'save'
                },
                {
                    id: 'ActivityManage:update',
                    label: 'update'
                },
                {
                    id: 'ActivityManage:delete',
                    label: 'delete'
                },
                {
                    id: 'ActivityManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'ActivityManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
    ]
}
