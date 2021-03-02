import Layout from '/@/layout/index.vue'

export default {
    path: '/instant-messaging',
    component: Layout,
    redirect: '/instant-messaging/index',
    alwaysShow: true, //总在根目录显示
    name: 'instantMessaging',
    icon: 'message',
    children: [
        {
            path: 'index',
            component: () => import('/@/views/core/instantMessaging/index.vue'),
            name: 'instantMessaging',
            perms: [

            ]
        }
    ]
}
