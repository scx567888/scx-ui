export * from "./scx-clustered-event-bus/scx-clustered-event-bus-vue-installer.js";
export * from "./scx-config-manager/scx-config-manager-vue-installer.js";
export * from "./scx-context-menu/index.js";
export * from "./scx-drag/index.js";
export * from "./scx-fetch/scx-fetch-vue-installer.js";
export * from "./scx-fss/scx-fss-vue-installer.js";
export * from "./scx-perm/index.js";
export * from "./scx-req/scx-req-vue-installer.js";
export * from "./scx-user-info/index.js";
export * from "./scx-user-info/scx-user-info-vue-installer.js";

import ScxIcon from "./scx-icon/index.vue";
import ScxCrud from "./scx-crud/index.vue";
import ScxGroup from "./scx-group/index.vue";
import ScxProgress from "./scx-progress/index.vue";
import ScxSwitch from "./scx-switch/index.vue";
import ScxUpload from "./scx-upload/index.vue";
import ScxUploadList from "./scx-upload-list/index.vue";
import {ScxContextMenuDirective} from "./scx-context-menu/index.js";
import {ScxDragDirective} from "./scx-drag/index.js";
import {createScxPermDirective} from "./scx-perm/index.js";

//以下为组件
const components = [ScxIcon, ScxCrud, ScxGroup, ScxProgress, ScxSwitch, ScxUpload, ScxUploadList];

//以下为指令
const directives = [ScxContextMenuDirective, ScxDragDirective];

const ScxComponent = {
    install: (app) => {
        //安装组件
        components.forEach(c => app.component(c.name, c));
        //安装指令
        directives.forEach(d => app.directive(d.name, d));
        // todo 这里因为我们的 scx-perm 指令需要使用 inject 但是现阶段 vue 并不支持 所以特殊处理一下
        // 未来可以参照 https://github.com/vuejs/core/pull/4235 进行改动
        const scxPermDirective = createScxPermDirective(app);
        app.directive(scxPermDirective.name, scxPermDirective);
    },
};

export {
    ScxIcon,
    ScxCrud,
    ScxGroup,
    ScxUpload,
    ScxUploadList,
    ScxComponent,
};
