import Layout from '/@/layout/index.vue'

export default {
    path: '/organization-manage',
    component: Layout,
    redirect: '/organization-manage/dept-info',
    alwaysShow: true, //总在根目录显示
    name: 'organizationManage',
    icon: 'tree',
    children: [
        {
            path: 'dept-manage',
            component: () => import('/@/views/core/organization/deptManage.vue'),
            name: 'deptManage',
            perms: [
                {
                    id: 'Dept:save',
                    label: 'save'
                },
                {
                    id: 'Dept:update',
                    label: 'update'
                },
                {
                    id: 'Dept:delete',
                    label: 'delete'
                },
            ]
        }
    ]
}
