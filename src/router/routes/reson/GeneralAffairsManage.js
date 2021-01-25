import Layout from '/@/layout/index.vue'

export default {
    path: '/general-affairs-manage',
    component: Layout,
    redirect: '/general-affairs-manage/school-production-manage',
    alwaysShow: true, //总在根目录显示
    name: 'generalAffairsManage',
    icon: 'modular',
    children: [
        {
            path: 'school-production-manage',
            component: () => import('/@/views/reson/generalAffairsManage/schoolProductionManage.vue'),
            name: 'schoolProductionManage',
            perms: []
        }, {
            path: 'repair-manage',
            component: () => import('/@/views/reson/generalAffairsManage/repairManage.vue'),
            name: 'repairManage',
            perms: []
        }
    ]
}
