import Layout from '/@/layout/index.vue'

export default {
    path: '/examine-manage',
    component: Layout,
    redirect: '/examine-manage/attendance-manage',
    alwaysShow: true, //总在根目录显示
    name: 'examineManage',
    icon: 'profile',
    children: [
        {
            path: 'attendance-manage',
            component: () => import('@/views/reson/examineManage/attendanceManage'),
            name: 'attendanceManage',
            perms: []
        }, {
            path: 'teacher-evaluation-manage',
            component: () => import('@/views/reson/examineManage/teacherEvaluationManage'),
            name: 'teacherEvaluationManage',
            perms: []
        }
    ]
}
