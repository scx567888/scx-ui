import ScxIcon from './_scx-icon/index.vue'
import ScxCrud from './_scx-crud/index.vue'
import ScxGroup from './_scx-group/index.vue'
import ScxUpload from './_scx-upload/index.vue'
import ScxUploadList from './_scx-upload-list/index.vue'
import ScxProgress from './_scx-progress/index.vue'
import {ScxContextMenuDirective} from "./scx-context-menu.js";
import {ScxDragDirective} from "./scx-drag.js";

//以下为组件
const components = [ScxIcon, ScxCrud, ScxGroup, ScxUpload, ScxUploadList, ScxProgress];

//以下为指令
const directives = [ScxContextMenuDirective, ScxDragDirective];

const ScxComponent = {
    install: (app) => {
        //安装组件
        components.forEach(c => app.component(c.name, c));
        //安装指令
        directives.forEach(d => app.directive(d.name, d));
    }
};

export {
    ScxIcon,
    ScxCrud,
    ScxGroup,
    ScxUpload,
    ScxUploadList,
    ScxComponent
}