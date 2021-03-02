import Layout from '/@/layout/index.vue'

export default {
    path: '/educational-manage',
    component: Layout,
    redirect: '/educational-manage/teaching-material-manage/teaching-material-info-manage',
    name: 'educationalManage',
    icon: 'book',
    children: [
        {
            path: 'teaching-material-manage',
            component: () => import('/@/views/core/threerouter.vue'),
            redirect: '/educational-manage/teaching-material-manage/teaching-material-info-manage',
            name: 'teachingMaterialManage',
            children: [
                {
                    path: 'teaching-material-info-manage',
                    component: () => import('/@/views/reson/educationalManage/teachingMaterialManage/teachingMaterialInfoManage.vue'),
                    name: 'teachingMaterialInfoManage',
                    perms: []
                },
                {
                    path: 'teaching-material-purchase-plan',
                    component: () => import('/@/views/reson/educationalManage/teachingMaterialManage/teachingMaterialPurchasePlan.vue'),
                    name: 'teachingMaterialPurchasePlan',
                    perms: []
                },
            ]
        },
        {
            path: 'training-base',
            component: () => import('/@/views/core/threerouter.vue'),
            name: 'trainingBase',
            redirect: '/educational-manage/training-base/training-base-build-info',
            children: [
                {
                    path: 'training-base-build-info',
                    component: () => import('/@/views/reson/educationalManage/trainingBase/trainingBaseBuildInfo.vue'),
                    name: 'trainingBaseBuildInfo',
                    perms: []
                }, {
                    path: 'conference-venue',
                    component: () => import('/@/views/reson/educationalManage/trainingBase/conferenceVenue.vue'),
                    name: 'conferenceVenue',
                    perms: []
                }, {
                    path: 'class-room-info',
                    component: () => import('/@/views/reson/educationalManage/trainingBase/classRoomInfo.vue'),
                    name: 'classRoomInfo',
                    perms: []
                }, {
                    path: 'bedroom-site-info',
                    component: () => import('/@/views/reson/educationalManage/trainingBase/bedRoomSiteInfo.vue'),
                    name: 'bedroomSiteInfo',
                    perms: []
                }]
        },
        {
            path: 'course-arrangement-manage',
            component: () => import('/@/views/reson/educationalManage/courseArrangementManage.vue'),
            name: 'courseArrangementManage',
            perms: []
        },
        {
            path: 'course-plan-manage',
            component: () => import('/@/views/reson/educationalManage/coursePlanManage.vue'),
            name: 'coursePlanManage',
            perms: []
        },
        {
            path: 'score-manage',
            component: () => import('/@/views/reson/educationalManage/scoreManage.vue'),
            name: 'scoreManage',
            perms: []
        },
        {
            path: 'teaching-and-research-activities-manage',
            component: () => import('/@/views/reson/educationalManage/teachingAndResearchActivitiesManage.vue'),
            name: 'teachingAndResearchActivitiesManage',
            perms: []
        },
        {
            path: 'timetable-manage',
            component: () => import('/@/views/reson/educationalManage/timetableManage.vue'),
            name: 'timetableManage',
            perms: []
        }
    ]
}
