import Layout from "../../layout/index.vue";

export default [
    {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        name: 'index',
        children: [
            {
                path: 'dashboard',
                component: () => import('/@/views/core/dashboard.vue'),
                name: 'dashboard',
                icon: 'dashboard',
                affix: true
            }
        ]
    },
    //默认登录界面
    {
        path: '/login',
        component: () => import('/@/views/core/login/index.vue'),
        hidden: true
    },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('/@/views/core/profile/index.vue'),
                name: 'profile',
                icon: 'user',
                noCache: true
            }
        ]
    }
]