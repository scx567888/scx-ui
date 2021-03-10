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
            path: 'course',
            component: () => import('/@/views/_scx/threerouter.vue'),
            alwaysShow: true, //总在根目录显示
            name: 'course',
            icon: 'profile',
            children: [
                {
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
                    path: 'subject-manage',
                    component: () => import('/@/views/bole/subject.vue'),
                    name: 'subjectManage',
                    perms: [
                        {
                            id: 'SubjectManage:list',
                            label: 'list'
                        },
                        {
                            id: 'SubjectManage:info',
                            label: 'info'
                        },
                        {
                            id: 'SubjectManage:save',
                            label: 'save'
                        },
                        {
                            id: 'SubjectManage:update',
                            label: 'update'
                        },
                        {
                            id: 'SubjectManage:delete',
                            label: 'delete'
                        },
                        {
                            id: 'SubjectManage:batchDelete',
                            label: 'batchDelete'
                        },
                        {
                            id: 'SubjectManage:revokeDelete',
                            label: 'revokeDelete'
                        }
                    ]
                },
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
            path: 'merchant',
            component: () => import('/@/views/_scx/threerouter.vue'),
            alwaysShow: true, //总在根目录显示
            name: 'merchant',
            icon: 'account-book',
            children: [
                {
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
                {
                    path: 'merchant-verify',
                    component: () => import('/@/views/bole/merchantVerify.vue'),
                    name: 'merchantVerify',
                    perms: [
                        {
                            id: 'MerchantVerify:list',
                            label: 'list'
                        },
                        {
                            id: 'MerchantVerify:info',
                            label: 'info'
                        },
                        {
                            id: 'MerchantVerify:save',
                            label: 'save'
                        },
                        {
                            id: 'MerchantVerify:update',
                            label: 'update'
                        },
                        {
                            id: 'MerchantVerify:delete',
                            label: 'delete'
                        },
                        {
                            id: 'MerchantVerify:batchDelete',
                            label: 'batchDelete'
                        },
                        {
                            id: 'MerchantVerify:revokeDelete',
                            label: 'revokeDelete'
                        }
                    ]
                },
                {
                    path: 'cost',
                    component: () => import('/@/views/bole/cost.vue'),
                    name: 'costManage',
                    perms: [
                        {
                            id: 'CostManage:list',
                            label: 'list'
                        },
                        {
                            id: 'CostManage:info',
                            label: 'info'
                        },
                        {
                            id: 'CostManage:save',
                            label: 'save'
                        },
                        {
                            id: 'CostManage:update',
                            label: 'update'
                        },
                        {
                            id: 'CostManage:delete',
                            label: 'delete'
                        },
                        {
                            id: 'CostManage:batchDelete',
                            label: 'batchDelete'
                        },
                        {
                            id: 'CostManage:revokeDelete',
                            label: 'revokeDelete'
                        }
                    ]
                },
            ]
        },
        {
            path: 'orderCode',
            component: () => import('/@/views/_scx/threerouter.vue'),
            alwaysShow: true, //总在根目录显示
            name: 'orderCode',
            icon: 'pushpin',
            children: [
                {
                    path: 'orderCode',
                    component: () => import('/@/views/bole/orderCode.vue'),
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
                    path: 'statement',
                    component: () => import('/@/views/bole/statement.vue'),
                    name: 'statement',
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
                    path: 'refund-info',
                    component: () => import('/@/views/bole/refundInfo.vue'),
                    name: 'refundInfo',
                    perms: [
                        {
                            id: 'RefundInfo:list',
                            label: 'list'
                        },
                        {
                            id: 'RefundInfo:info',
                            label: 'info'
                        },
                        {
                            id: 'RefundInfo:save',
                            label: 'save'
                        },
                        {
                            id: 'RefundInfo:update',
                            label: 'update'
                        },
                        {
                            id: 'RefundInfo:delete',
                            label: 'delete'
                        },
                        {
                            id: 'RefundInfo:batchDelete',
                            label: 'batchDelete'
                        },
                        {
                            id: 'RefundInfo:revokeDelete',
                            label: 'revokeDelete'
                        }
                    ]
                },
                {
                    path: 'refund-verify',
                    component: () => import('/@/views/bole/refundVerify.vue'),
                    name: 'refundVerify',
                    perms: [
                        {
                            id: 'RefundVerify:list',
                            label: 'list'
                        },
                        {
                            id: 'RefundVerify:info',
                            label: 'info'
                        },
                        {
                            id: 'RefundVerify:save',
                            label: 'save'
                        },
                        {
                            id: 'RefundVerify:update',
                            label: 'update'
                        },
                        {
                            id: 'RefundVerify:delete',
                            label: 'delete'
                        },
                        {
                            id: 'RefundVerify:batchDelete',
                            label: 'batchDelete'
                        },
                        {
                            id: 'RefundVerify:revokeDelete',
                            label: 'revokeDelete'
                        }
                    ]
                },
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
