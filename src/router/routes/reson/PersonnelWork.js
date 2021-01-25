import Layout from '/@/layout/index.vue'

export default {
    path: '/personnel-work',
    component: Layout,
    redirect: '/personnel-work/monthly-payroll',
    alwaysShow: true, //总在根目录显示
    name: 'personnelWork',
    icon: 'contacts',
    children: [
        {
            path: 'personnel-changes',
            component: () => import('/@/views/reson/personnelWork/personnelChanges.vue'),
            name: 'personnelChanges',
            perms: []
        },
        {
            path: 'monthly-payroll',
            component: () => import('/@/views/reson/personnelWork/monthlyPayroll.vue'),
            name: 'monthlyPayroll',
            perms: []
        },
        {
            path: 'public-group-manage',
            component: () => import('/@/views/reson/personnelWork/publicGroupManage.vue'),
            name: 'publicGroupManage',
            perms: []
        },
        {
            path: 'enrollment-manage',
            component: () => import('/@/views/core/threerouter.vue'),
            name: 'enrollmentManage',
            redirect: '/personnel-work/enrollment-manage/enrollment-plan-manage',
            children: [
                {
                    path: 'enrollment-plan-manage',
                    component: () => import('/@/views/reson/personnelWork/enrollmentManage/enrollmentPlanManage.vue'),
                    name: 'enrollmentPlanManage',
                    perms: []
                },
                {
                    path: 'admission-student-manage',
                    component: () => import('/@/views/reson/personnelWork/enrollmentManage/admissionStudentManage.vue'),
                    name: 'admissionStudentManage',
                    perms: []
                },
                {
                    path: 'freshmen-registration',
                    component: () => import('/@/views/reson/personnelWork/enrollmentManage/freshmenRegistration.vue'),
                    name: 'freshmenRegistration',
                    perms: []
                },
                {
                    path: 'report-student-query',
                    component: () => import('/@/views/reson/personnelWork/enrollmentManage/reportStudentQuery.vue'),
                    name: 'reportStudentQuery',
                    perms: []
                },
                {
                    path: 'enrollment-statistics',
                    component: () => import('/@/views/reson/personnelWork/enrollmentManage/enrollmentStatistics.vue'),
                    name: 'enrollmentStatistics',
                    perms: []
                },
            ]
        },
        {
            path: 'divide-into-classes-manage',
            component: () => import('/@/views/reson/personnelWork/divideIntoClassesManage.vue'),
            name: 'divideIntoClassesManage',
            perms: []
        },
    ]
}

