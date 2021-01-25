//以下为组件
import ScxBreadcrumb from './ScxBreadcrumb/index.vue'; //面包屑组件
import ScxCodeMirror from './ScxCodeMirror/index.vue'; //代码编辑器
import ScxCrud from './ScxCrud/index.vue'; //通用 crud
import ScxEasyItem from './ScxEasyItem/index.vue'; //form 元素封装
import ScxFormDesign from './ScxFormDesign/index.vue'; //表单设计
import ScxFormPreview from './ScxFormDesign/Preview.vue'; //表单设计预览组件
import ScxFullScreen from './ScxFullScreen/index.vue'; //全屏组件
import ScxIcon from './ScxIcon/index.vue'; //图标组件
import ScxLangSelect from './ScxLangSelect/index.vue'; //语言选择组件
import ScxLogo from './ScxLogo/index.vue'; //logo
import ScxMenuSearch from './ScxMenuSearch/index.vue'; //菜单搜索
import ScxMenuToggle from './ScxMenuToggle/index.vue'; //切换菜单展开折叠的按钮
import ScxProgress from './ScxProgress/index.vue'; //进度条
import ScxSizeSelect from './ScxSizeSelect/index.vue'; //全局大小选择组件
import ScxSwitch from './ScxSwitch/index.vue'; //switch
import ScxTable from './ScxTable/index.vue'; //表格组件
import ScxTinymce from './ScxTinymce/index.vue'; //富文本编辑器组件
import ScxTree from './ScxTree/index.vue'; //树 简单封装
import ScxTreeSelect from './ScxTreeSelect/index.vue'; //下拉树 简单封装
import ScxUpload from './ScxUpload/index.vue'; //文件上传简单封装组件
import ScxUserAvatar from './ScxUserAvatar/index.vue'; //用户头像
import ScxV2T from './ScxV2T/index.jsx'; //函数式组件 仅作渲染使用
//以下为指令
import ScxPermissionDirective from "./ScxPermission/index"; //权限指令
import ScxContextMenuDirective from "./ScxContextMenu/index"; //右键菜单指令
import ScxDragDirective from './ScxDrag/index.js'; //拖拽指令

const components = [
    ScxBreadcrumb,
    ScxCodeMirror,
    ScxCrud,
    ScxEasyItem,
    ScxFormDesign,
    ScxFormPreview,
    ScxFullScreen,
    ScxIcon,
    ScxLangSelect,
    ScxLogo,
    ScxMenuSearch,
    ScxMenuToggle,
    ScxProgress,
    ScxSizeSelect,
    ScxSwitch,
    ScxTable,
    ScxTinymce,
    ScxTree,
    ScxTreeSelect,
    ScxUpload,
    ScxUserAvatar,
    ScxV2T,
];

const directives = [
    ScxPermissionDirective,
    ScxContextMenuDirective,
    ScxDragDirective
];

//通用的 组件和指令安装
export default {
    install: (app) => {
        //安装组件
        components.forEach(c => app.component(c.name, c));
        //安装指令
        directives.forEach(d => app.directive(d.name, d));
    }
};
