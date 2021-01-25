import Layout from '/@/layout/index.vue'

export default {
    path: '/attend',
    component: Layout,
    alwaysShow: true,
    name: 'attend',
    icon: 'el-icon-s-claim',
    children: [
        {
            path: 'attendance-list',
            component: () => import('/@/views/attend/attendanceList.vue'),
            name: 'attendanceList',
            perms: [
                {
                    id: 'Attendance:list',
                    label: 'list'
                },
                {
                    id: 'Attendance:info',
                    label: 'info'
                },
                {
                    id: 'Attendance:save',
                    label: 'save'
                },
                {
                    id: 'Attendance:update',
                    label: 'update'
                },
                {
                    id: 'Attendance:delete',
                    label: 'delete'
                },
                {
                    id: 'Attendance:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'Attendance:revokeDelete',
                    label: 'revokeDelete'
                },
                {
                    id: 'Config:update',
                    label: 'update'
                }, {
                    id: 'Config:delete',
                    label: 'delete'
                }, {
                    id: 'Config:save',
                    label: 'save'
                }, {
                    id: 'Config:list',
                    label: 'list'
                }, {
                    id: 'Dept:list',
                    label: 'list'
                }

            ]
        },
        {
            path: 'attendance-person',
            component: () => import('/@/views/attend/attendancePerson.vue'),
            name: 'attendancePerson',
            perms: [
                {
                    id: 'User:list',
                    label: 'list'
                },
                {
                    id: 'User:info',
                    label: 'info'
                },
                {
                    id: 'User:save',
                    label: 'save'
                },
                {
                    id: 'User:update',
                    label: 'update'
                },
                {
                    id: 'User:delete',
                    label: 'delete'
                },
                {
                    id: 'User:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'User:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
    ]

}
