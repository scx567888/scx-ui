import Layout from '/@/layout/index.vue'

export default {
    path: '/ims',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'ims',
    icon: 'alert',
    children: [
        {
            path: 'jidu',
            component: () => import('/@/views/ims/jidu.vue'),
            name: 'jidu'
        },
        {
            path: 'fawendengji',
            component: () => import('/@/views/ims/fawendengji.vue'),
            name: 'fawendengji'
        },

        {
            path: 'userManage',
            component: () => import('/@/views/ims/userManage.vue'),
            name: 'userManage',
        },
        {
            path: 'laiwendanwei',
            component: () => import('/@/views/ims/laiwendanwei.vue'),
            name: 'laiwendanwei'
        },
        {
            path: 'laiwenleixing',
            component: () => import('/@/views/ims/laiwenleixing.vue'),
            name: 'laiwenleixing'
        },
        {

            path: 'laiwenleixingleibei',
            component: () => import('/@/views/ims/laiwenleixingleibei.vue'),
            name: 'laiwenleixingleibei',

        },
        {
            path: 'jiafenxiang',
            component: () => import('/@/views/ims/jiafenxiang.vue'),
            name: 'jiafenxiang'
        },
        {

            path: 'pishixiang',
            component: () => import('/@/views/ims/pishixiang.vue'),
            name: 'pishixiang'

        }
    ]
};
