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
            path: 'activity',
            component: () => import('/@/views/bole/activity.vue'),
            name: 'activity',
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
            path: 'course',
            component: () => import('/@/views/bole/course.vue'),
            name: 'course',
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
            path: 'teacher',
            component: () => import('/@/views/bole/teacher.vue'),
            name: 'teacher',
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
            path: 'store',
            component: () => import('/@/views/core/threerouter.vue'),
            alwaysShow: true, //总在根目录显示
            name: 'store',
            icon: 'home',
            children: [
                {
                    path: 'store',
                    component: () => import('/@/views/bole/store.vue'),
                    name: 'store',
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
                    path: 'store-type',
                    component: () => import('/@/views/bole/storeType.vue'),
                    name: 'storeType',
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
            path: 'orderCode',
            component: () => import('/@/views/bole/orderCodeManage.vue'),
            name: 'orderCode',
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
            path: 'merchant',
            component: () => import('/@/views/bole/merchant.vue'),
            name: 'merchant',
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
            component: () => import('/@/views/bole/IM.vue'),
            name: 'instantMessaging',
            perms: [

            ]
        }
    ]
}
