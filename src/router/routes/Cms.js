import Layout from '/@/layout/index.vue'

export default {
    path: '/cms',
    component: Layout,
    redirect: '/cms/article-manage',
    alwaysShow: true, //总在根目录显示
    name: 'cms',
    icon: 'lcd-display',
    children: [
        {
            path: 'column-manage',
            component: () => import('/@/views/cms/columnManage.vue'),
            name: 'columnManage',
            perms: []
        }, {
            path: 'article-manage',
            component: () => import('/@/views/cms/articleManage.vue'),
            name: 'articleManage',
            perms: []
        }, {
            path: 'template-manage',
            component: () => import('/@/views/cms/templateManage.vue'),
            name: 'templateManage',
            perms: []
        },
    ]
}
