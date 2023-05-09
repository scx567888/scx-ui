import {createRouter, createWebHashHistory} from "vue-router";

const ScxRouter = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/home.vue'),
        },
        {
            path: '/scx-drag-test',
            name: 'scx-drag-test',
            component: () => import('./views/scx-drag-test.vue'),
        },
        {
            path: '/scx-contextmenu-test',
            name: 'scx-contextmenu-test',
            component: () => import('./views/scx-contextmenu-test.vue'),
        },
        {
            path: '/scx-eventbus-test',
            name: 'scx-eventbus-test',
            component: () => import('./views/scx-eventbus-test.vue'),
        },
        {
            path: '/scx-icon-test',
            name: 'scx-icon-test',
            component: () => import('./views/scx-icon-test.vue'),
        },
        {
            path: '/scx-xlsx-test',
            name: 'scx-xlsx-test',
            component: () => import('./views/scx-xlsx-test.vue'),
        },
        {
            path: '/scx-crud-test',
            name: 'scx-crud-test',
            component: () => import('./views/scx-crud-test.vue'),
        }, {
            path: '/scx-group-test',
            name: 'scx-group-test',
            component: () => import('./views/scx-group-test.vue'),
        },
        {
            path: '/list-to-tree-test',
            name: 'list-to-tree-test',
            component: () => import('./views/list-to-tree-test.vue'),
        },
        {
            path: '/scx-upload-test',
            name: 'scx-upload-test',
            component: () => import('./views/scx-upload-test.vue'),
        },
        {
            path: '/scx-upload-list-test',
            name: 'scx-upload-list-test',
            component: () => import('./views/scx-upload-list-test.vue'),
        },
        {
            path: '/scx-loading-test',
            name: 'scx-loading-test',
            component: () => import('./views/scx-loading-test.vue'),
        },
        {
            path: '/scx-perm-test',
            name: 'scx-perm-test',
            component: () => import('./views/scx-perm-test.vue'),
        },
        {
            path: '/html-to-text-test',
            name: 'html-to-text-test',
            component: () => import('./views/html-to-text-test.vue'),
        },
        {
            path: '/watermark-test',
            name: 'watermark-test',
            component: () => import('./views/watermark-test.vue'),
        },
    ]
});

export {ScxRouter}
