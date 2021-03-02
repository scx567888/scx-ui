import Layout from '/@/layout/index.vue'

export default {
    path: '/bole',
    component: Layout,
    alwaysShow: true, //总在根目录显示
    name: 'bole',
    icon: 'alert',
    children: [
        {
            icon: 'alert',
            path: 'activity-manage',
            component: () => import('/@/views/bole/activityManage.vue'),
            name: 'activityManage',
            perms: [
                {
                    id: 'ActivityManage:list',
                    label: 'list'
                },
                {
                    id: 'ActivityManage:info',
                    label: 'info'
                },
                {
                    id: 'ActivityManage:save',
                    label: 'save'
                },
                {
                    id: 'ActivityManage:update',
                    label: 'update'
                },
                {
                    id: 'ActivityManage:delete',
                    label: 'delete'
                },
                {
                    id: 'ActivityManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'ActivityManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
        {
            icon: 'profile',
            path: 'course-manage',
            component: () => import('/@/views/bole/courseManage.vue'),
            name: 'courseManage',
            perms: [
                {
                    id: 'CourseManage:list',
                    label: 'list'
                },
                {
                    id: 'CourseManage:info',
                    label: 'info'
                },
                {
                    id: 'CourseManage:save',
                    label: 'save'
                },
                {
                    id: 'CourseManage:update',
                    label: 'update'
                },
                {
                    id: 'CourseManage:delete',
                    label: 'delete'
                },
                {
                    id: 'CourseManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'CourseManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
        {
            icon: 'peoples',
            path: 'teacher-manage',
            component: () => import('/@/views/bole/teacherManage.vue'),
            name: 'teacherManage',
            perms: [
                {
                    id: 'TeacherManage:list',
                    label: 'list'
                },
                {
                    id: 'TeacherManage:info',
                    label: 'info'
                },
                {
                    id: 'TeacherManage:save',
                    label: 'save'
                },
                {
                    id: 'TeacherManage:update',
                    label: 'update'
                },
                {
                    id: 'TeacherManage:delete',
                    label: 'delete'
                },
                {
                    id: 'TeacherManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'TeacherManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
        {
            path: 'store-manage',
            component: () => import('/@/views/core/threerouter.vue'),
            alwaysShow: true, //总在根目录显示
            name: 'storeManage',
            icon: 'home',
            children: [
                {
                    path: 'store-manage',
                    component: () => import('/@/views/bole/storeManage.vue'),
                    name: 'storeManage',
                    perms: [
                        {
                            id: 'StoreManage:list',
                            label: 'list'
                        },
                        {
                            id: 'StoreManage:info',
                            label: 'info'
                        },
                        {
                            id: 'StoreManage:save',
                            label: 'save'
                        },
                        {
                            id: 'StoreManage:update',
                            label: 'update'
                        },
                        {
                            id: 'StoreManage:delete',
                            label: 'delete'
                        },
                        {
                            id: 'StoreManage:batchDelete',
                            label: 'batchDelete'
                        },
                        {
                            id: 'StoreManage:revokeDelete',
                            label: 'revokeDelete'
                        }
                    ]
                },
                {
                    path: 'store-type-manage',
                    component: () => import('/@/views/bole/storeTypeManage.vue'),
                    name: 'storeTypeManage',
                    perms: [
                        {
                            id: 'StoreTypeManage:list',
                            label: 'list'
                        },
                        {
                            id: 'StoreTypeManage:info',
                            label: 'info'
                        },
                        {
                            id: 'StoreTypeManage:save',
                            label: 'save'
                        },
                        {
                            id: 'StoreTypeManage:update',
                            label: 'update'
                        },
                        {
                            id: 'StoreTypeManage:delete',
                            label: 'delete'
                        },
                        {
                            id: 'StoreTypeManage:batchDelete',
                            label: 'batchDelete'
                        },
                        {
                            id: 'StoreTypeManage:revokeDelete',
                            label: 'revokeDelete'
                        }
                    ]
                },
            ]
        },
        {
            icon: 'pushpin',
            path: 'orderCode-manage',
            component: () => import('/@/views/bole/orderCodeManage.vue'),
            name: 'orderCodeManage',
            perms: [
                {
                    id: 'OrderCodeManage:list',
                    label: 'list'
                },
                {
                    id: 'OrderCodeManage:info',
                    label: 'info'
                },
            ]
        },
        {
            icon: 'account-book',
            path: 'merchant-manage',
            component: () => import('/@/views/bole/merchantManage.vue'),
            name: 'merchantManage',
            perms: [
                {
                    id: 'MerchantManage:list',
                    label: 'list'
                },
                {
                    id: 'MerchantManage:info',
                    label: 'info'
                },
                {
                    id: 'MerchantManage:save',
                    label: 'save'
                },
                {
                    id: 'MerchantManage:update',
                    label: 'update'
                },
                {
                    id: 'MerchantManage:delete',
                    label: 'delete'
                },
                {
                    id: 'MerchantManage:batchDelete',
                    label: 'batchDelete'
                },
                {
                    id: 'MerchantManage:revokeDelete',
                    label: 'revokeDelete'
                }
            ]
        },
        {
            icon: 'message',
            path: 'index',
            component: () => import('/@/views/bole/instantMessaging.vue'),
            name: 'instantMessaging',
            perms: [

            ]
        }
    ]
}
