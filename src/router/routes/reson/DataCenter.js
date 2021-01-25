import Layout from '/@/layout/index.vue'

export default {
    path: '/shujuzhongxin',
    component: Layout,
    alwaysShow: true,
    name: 'shujuzhongxin',
    icon: 'hdd',
    children: [
        {
            path: 'xinxibiaozhun',
            component: () => import('/@/views/reson/datacenter/xinxibiaozhun.vue'),
            name: 'xinxibiaozhun',
            perms: []
        }, {
            path: 'quanjuku',
            component: () => import('/@/views/reson/datacenter/quanjuku.vue'),
            name: 'quanjuku',
            perms: []
        }, {
            path: 'shujubianji',
            component: () => import('/@/views/reson/datacenter/shujubianji.vue'),
            name: 'shujubianji',
            perms: []
        }, {
            path: 'yingsheguanli',
            component: () => import('/@/views/reson/datacenter/yingsheguanli.vue'),
            name: 'yingsheguanli',
            perms: []
        }, {
            path: 'banbengenzong',
            component: () => import('/@/views/reson/datacenter/banbengenzong.vue'),
            name: 'banbengenzong',
            perms: []
        }, {
            path: 'banbengenzongInfo',
            component: () => import('/@/views/reson/datacenter/banbengenzongInfo.vue'),
            name: 'banbengenzongInfo',
            perms: []
        }, {
            path: 'changshangguanli',
            component: () => import('/@/views/reson/datacenter/changshangguanli.vue'),
            name: 'changshangguanli',
            perms: []
        }, {
            path: 'jiekouguanli',
            component: () => import('/@/views/reson/datacenter/jiekouguanli.vue'),
            name: 'jiekouguanli',
            perms: []
        }
    ],

}
