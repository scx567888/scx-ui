import Layout from '/@/layout/index.vue'

export default {
    path: '/store-manage',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'storeManage',
    icon: 'home',
    children: [
        {
            path: 'store-manage',
            component: () => import('/@/views/bole/storeManage/storeManage.vue'),
            name: 'storeManage',
            perms: [
                {
                    id: 'StoreManage:list',
                    label: 'list'
                },
                {
                    id: 'StoreManage:info',
                    label: 'info'
                },
                {
                    id: 'StoreManage:save',
                    label: 'save'
                },
                {
                    id: 'StoreManage:update',
                    label: 'update'
                },
                {
                    id: 'StoreManage:delete',
                    label: 'delete'
                },
                {
                    id: 'StoreManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'StoreManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
        {
            path: 'store-type-manage',
            component: () => import('/@/views/bole/storeTypeManage/storeTypeManage.vue'),
            name: 'storeTypeManage',
            perms: [
                {
                    id: 'StoreTypeManage:list',
                    label: 'list'
                },
                {
                    id: 'StoreTypeManage:info',
                    label: 'info'
                },
                {
                    id: 'StoreTypeManage:save',
                    label: 'save'
                },
                {
                    id: 'StoreTypeManage:update',
                    label: 'update'
                },
                {
                    id: 'StoreTypeManage:delete',
                    label: 'delete'
                },
                {
                    id: 'StoreTypeManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'StoreTypeManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
    ]
}
