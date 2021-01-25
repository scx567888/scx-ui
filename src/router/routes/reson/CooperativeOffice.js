import Layout from '/@/layout/index.vue'

export default {
    path: '/cooperative-office',
    component: Layout,
    redirect: '/cooperative-office/notice-announcement',
    alwaysShow: true, //总在根目录显示
    name: 'cooperativeOffice',
    icon: 'printer',
    children: [
        {
            path: 'notice-announcement',
            component: () => import('/@/views/reson/cooperativeOffice/noticeAnnouncement.vue'),
            name: 'noticeAnnouncement',
            perms: []
        }, {
            path: 'address-book-manage',
            component: () => import('/@/views/reson/cooperativeOffice/addressBookManage.vue'),
            name: 'addressBookManage',
            perms: []
        },
        {
            path: 'vehicle-manage',
            component: () => import('/@/views/reson/cooperativeOffice/vehicleManage.vue'),
            name: 'vehicleManage',
            perms: []
        }, {
            path: 'printing-manage',
            component: () => import('/@/views/reson/cooperativeOffice/printingManage.vue'),
            name: 'printingManage',
            perms: []
        }, {
            path: 'visitor-manage',
            component: () => import('/@/views/reson/cooperativeOffice/visitorManage.vue'),
            name: 'visitorManage',
            perms: []
        }, {
            path: 'meetings-manage',
            component: () => import('/@/views/reson/cooperativeOffice/meetingsManage.vue'),
            name: 'meetingsManage',
            perms: []
        }
    ]
}
