export * from "./scx-context-menu/index.js";
export * from "./scx-drag/index.js";

import ScxGroup from "./scx-group/index.vue";
import ScxIcon from "./scx-icon/index.vue";
import ScxInput from "./scx-input/index.vue";
import ScxPanel from "./scx-panel/index.vue";
import ScxPanelItem from "./scx-panel/scx-panel-item.vue";
import ScxProgress from "./scx-progress/index.vue";
import ScxSwitch from "./scx-switch/index.vue";
import ScxUpload from "./scx-upload/index.vue";
import ScxUploadList from "./scx-upload-list/index.vue";
import {ScxContextMenuDirective} from "./scx-context-menu/index.js";
import {ScxDragDirective} from "./scx-drag/index.js";

//以下为组件
const components = [ScxGroup, ScxIcon, ScxInput, ScxPanel, ScxPanelItem, ScxProgress, ScxSwitch, ScxUpload, ScxUploadList];

//以下为指令
const directives = [ScxContextMenuDirective, ScxDragDirective];

const ScxComponent = {
    install: (app) => {
        //安装组件
        components.forEach(c => app.component(c.name, c));
        //安装指令
        directives.forEach(d => app.directive(d.name, d));
    },
};

export {
    ScxGroup,
    ScxIcon,
    ScxInput,
    ScxPanel,
    ScxPanelItem,
    ScxProgress,
    ScxSwitch,
    ScxUpload,
    ScxUploadList,
    ScxContextMenuDirective,
    ScxDragDirective,
    ScxComponent,
};
