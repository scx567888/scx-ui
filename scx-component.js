import ScxIcon from "./_scx-icon/index.vue";
import ScxCrud from "./_scx-crud/index.vue";
import ScxGroup from "./_scx-group/index.vue";
import ScxGroupNoTransition from "./_scx-group-no-transition/index.vue";
import ScxUpload from "./_scx-upload/index.vue";
import ScxUploadList from "./_scx-upload-list/index.vue";
import ScxProgress from "./_scx-progress/index.vue";
import {ScxContextMenuDirective} from "./scx-context-menu.js";
import {ScxDragDirective} from "./scx-drag.js";
import {createScxPermDirective} from "./scx-perm.js";

//以下为组件
const components = [ScxIcon, ScxCrud, ScxGroup, ScxGroupNoTransition, ScxUpload, ScxUploadList, ScxProgress];

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
    ScxGroupNoTransition,
    ScxUpload,
    ScxUploadList,
    ScxComponent,
};
