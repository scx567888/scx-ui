import Layout from '/@/layout/index.vue'

export default {
    path: '/student-work',
    component: Layout,
    redirect: '/student-work/student-dormitory/building-info',
    alwaysShow: true, //总在根目录显示
    name: 'studentWork',
    icon: 'clipboard',
    children: [
        {
            path: 'student-status',
            component: () => import('/@/views/core/threerouter.vue'),
            name: 'studentStatus',
            redirect: '/student-work/student-status/student-status-info',
            children: [
                {
                    path: 'student-status-info',
                    component: () => import('/@/views/reson/studentWork/studentStatus/studentStatusInfo.vue'),
                    name: 'studentStatusInfo',
                    perms: []
                }, {
                    path: 'student-status-changes',
                    component: () => import('/@/views/reson/studentWork/studentStatus/studentStatusChanges.vue'),
                    name: 'studentStatusChanges',
                    perms: []
                },
                {
                    path: 'student-status-changes-revoke',
                    component: () => import('/@/views/reson/studentWork/studentStatus/studentStatusChangesRevoke.vue'),
                    name: 'studentStatusChangesRevoke',
                    perms: []
                },
                {
                    path: 'student-status-changes-logs',
                    component: () => import('/@/views/reson/studentWork/studentStatus/studentStatusChangesLogs.vue'),
                    name: 'studentStatusChangesLogs',
                    perms: []
                }
            ]
        },
        {
            path: 'bursary-manage',
            component: () => import('/@/views/reson/studentWork/bursaryManage.vue'),
            name: 'bursaryManage',
            perms: []
        },
        {
            path: 'student-dormitory',
            component: () => import('/@/views/core/threerouter.vue'),
            redirect: '/student-work/student-dormitory/building-info',
            name: 'studentDormitory',
            children: [
                {
                    path: 'building-info',
                    component: () => import('/@/views/reson/studentWork/studentDormitory/buildingInfo.vue'),
                    name: 'buildingInfo',
                    perms: []
                }, {
                    path: 'dorm-info',
                    component: () => import('/@/views/reson/studentWork/studentDormitory/dormInfo.vue'),
                    name: 'dormInfo',
                    perms: []
                }]
        },
        {
            path: 'student-merits-and-punishments-manage',
            component: () => import('/@/views/reson/studentWork/studentMeritsAndPunishmentsManage.vue'),
            name: 'studentMeritsAndPunishmentsManage',
            perms: []
        },
        {
            path: 'student-growth-record',
            component: () => import('/@/views/reson/studentWork/studentGrowthRecord.vue'),
            name: 'studentGrowthRecord',
            perms: []
        },
    ]
}
