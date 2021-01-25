import Layout from '/@/layout/index.vue'

export default {
    path: '/orderCode-manage',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'orderCodeManage',
    icon: 'pushpin',
    children: [
        {
            path: 'orderCode-manage',
            component: () => import('/@/views/bole/orderCodeManage/orderCodeManage.vue'),
            name: 'orderCodeManage',
            perms: [
                {
                    id: 'OrderCodeManage:list',
                    label: 'list'
                },
                {
                    id: 'OrderCodeManage:info',
                    label: 'info'
                },
            ]
        },
    ]
}
