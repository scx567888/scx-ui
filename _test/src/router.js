import {createRouter, createWebHashHistory} from "vue-router";

const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/home.vue"),
        },
        {
            path: "/scx-drag-test",
            name: "scx-drag-test",
            component: () => import("./views/scx-drag-test.vue"),
        },
        {
            path: "/scx-contextmenu-test",
            name: "scx-contextmenu-test",
            component: () => import("./views/scx-contextmenu-test.vue"),
        },
        {
            path: "/scx-icon-test",
            name: "scx-icon-test",
            component: () => import("./views/scx-icon-test.vue"),
        },
        {
            path: "/scx-group-test",
            name: "scx-group-test",
            component: () => import("./views/scx-group-test.vue"),
        },
        {
            path: "/scx-panel-test",
            name: "scx-panel-test",
            component: () => import("./views/scx-panel-test.vue"),
        },
        {
            path: "/scx-progress-test",
            name: "scx-progress-test",
            component: () => import("./views/scx-progress-test.vue"),
        },
        {
            path: "/list-to-tree-test",
            name: "list-to-tree-test",
            component: () => import("./views/list-to-tree-test.vue"),
        },
        {
            path: "/scx-upload-test",
            name: "scx-upload-test",
            component: () => import("./views/scx-upload-test.vue"),
        },
        {
            path: "/scx-upload-list-test",
            name: "scx-upload-list-test",
            component: () => import("./views/scx-upload-list-test.vue"),
        },
        {
            path: "/html-to-text-test",
            name: "html-to-text-test",
            component: () => import("./views/html-to-text-test.vue"),
        },
        {
            path: "/watermark-test",
            name: "watermark-test",
            component: () => import("./views/watermark-test.vue"),
        },
        {
            path: "/scx-switch-test",
            name: "scx-switch-test",
            component: () => import("./views/scx-switch-test.vue"),
        },
    ],
});

export {Router};
