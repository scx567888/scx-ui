import Layout from '/@/layout/index.vue'

export default {
    path: '/system',
    component: Layout,
    redirect: '/system/project-note',
    alwaysShow: true,
    name: 'system',
    icon: 'setting',
    children: [
        {
            path: 'project-note',
            component: () => import('/@/views/core/system/projectNote.vue'),
            name: 'projectNote',
            perms: []
        }, {
            path: 'test',
            component: () => import('/@/views/core/system/test.vue'),
            name: 'test',
            perms: []
        }
    ]
}
