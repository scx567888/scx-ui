import Layout from '/@/layout/index.vue'

export default {
    path: '/ims',
    component: Layout,
    redirect: '/ims/shouwendengji',
    alwaysShow: true,
    name: 'ims',
    icon: 'el-icon-s-check',
    children: [
        {
            path: 'shouwendengji',
            component: () => import('/@/views/ims/shouwendengji.vue'),
            name: 'shouwendengji',
            perms: []
        },
        {
            path: 'fawendengji',
            component: () => import('/@/views/ims/fawendengji.vue'),
            name: 'fawendengji',
            perms: []
        }, {
            path: 'jidu',
            component: () => import('/@/views/ims/jidu.vue'),
            name: 'jidu',
            perms: []
        },
        {
            path: 'userManage',
            component: () => import('/@/views/ims/userManage.vue'),
            name: 'userManage',
            perms: []
        },
        {
            path: 'zhilingxingrenwu',
            component: () => import('/@/views/ims/zhilingxingrenwu.vue'),
            name: 'zhilingxingrenwu',
            perms: []
        }
    ]

}
