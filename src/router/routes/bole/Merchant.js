import Layout from '/@/layout/index.vue'

export default {
    path: '/merchant-manage',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'merchantManage',
    icon: 'account-book',
    children: [
        {
            path: 'merchant-manage',
            component: () => import('/@/views/bole/merchantManage/merchantManage.vue'),
            name: 'merchantManage',
            perms: [
                {
                    id: 'MerchantManage:list',
                    label: 'list'
                },
                {
                    id: 'MerchantManage:info',
                    label: 'info'
                },
                {
                    id: 'MerchantManage:save',
                    label: 'save'
                },
                {
                    id: 'MerchantManage:update',
                    label: 'update'
                },
                {
                    id: 'MerchantManage:delete',
                    label: 'delete'
                },
                {
                    id: 'MerchantManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'MerchantManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
    ]
}
