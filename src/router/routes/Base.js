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
                component: () => import('/@/views/base/dashboard.vue'),
                name: 'dashboard',
                icon: 'dashboard',
                affix: true
            }
        ]
    },
    //默认登录界面
    {
        path: '/login',
        component: () => import('/@/views/base/login/index.vue'),
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
                component: () => import('/@/views/base/profile/index.vue'),
                name: 'profile',
                icon: 'user',
                noCache: true
            }
        ]
    }
]