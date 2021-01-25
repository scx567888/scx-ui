import Layout from '/@/layout/index.vue'

export default {
    path: '/workflow',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'workflow',
    icon: 'workflow',
    children: [{
        path: 'process-manage',
        component: () => import('/@/views/workflow/processManage.vue'),
        name: 'processManage',
        perms: [
            {
                id: 'Process:list',
                label: 'list'
            },
            {
                id: 'Process:info',
                label: 'info'
            },
            {
                id: 'Process:save',
                label: 'save'
            },
            {
                id: 'Process:update',
                label: 'update'
            },
            {
                id: 'Process:delete',
                label: 'delete'
            },
            {
                id: 'Process:batchDelete',
                label: 'batchDelete'
            },
            {
                id: 'Process:revokeDelete',
                label: 'revokeDelete'
            }
        ]
    }, {
        path: 'form',
        component: () => import('/@/views/workflow/formList.vue'),
        name: 'form',
        perms: [{
            id: 'Form:list',
            label: 'list'
        }, {
            id: 'Form:info',
            label: 'info'
        }, {
            id: 'Form:save',
            label: 'save'
        }, {
            id: 'Form:update',
            label: 'update'
        }, {
            id: 'Form:delete',
            label: 'delete'
        }, {
            id: 'Form:batchDelete',
            label: 'batchDelete'
        }, {
            id: 'Form:revokeDelete',
            label: 'revokeDelete'
        }]
    }, {
        path: 'formMarker',
        component: () => import('/@/views/workflow/formMarker.vue'),
        name: 'formMarker',
        hidden: true,
        perms: []
    }, {
        hidden: true,
        path: 'modeler',
        component: () => import('/@/views/workflow/modeler.vue'),
        name: 'modeler',
        perms: []
    }, {
        path: 'process-apply',
        component: () => import('/@/views/workflow/processApply.vue'),
        name: 'processApply',
        perms: []
    }, {
        path: 'my-apply',
        component: () => import('/@/views/workflow/myApply.vue'),
        name: 'myApply',
        perms: []
    }, {
        path: 'process-task',
        component: () => import('/@/views/workflow/processTask.vue'),
        name: 'processTask',
        perms: []
    }, {
        path: 'process-history',
        component: () => import('/@/views/workflow/processHistory.vue'),
        name: 'processHistory',
        perms: []
    }]
}
