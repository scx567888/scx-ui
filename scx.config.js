export default {
    title: 'SCX',// 主标题
    openModule: ['*'],// 开启的模块 --> openModule: ['core', 'cms', 'bole','attend']
    defaultSetting: {// 平台默认的设置 用户初次使用时采用 (及 localStorage 里不存在以下值时的默认值)
        theme: 'green',// 默认主题 现有 dark,default (使用时请设置为 '' ) ,green,purple,red,windows
        tagsView: true,// 默认是否显示 多任务栏
        sidebarLogo: true,// 默认是否显示 logo
        lowSpecialEffect: false,// 默认是否使用低特效模式 (开启后会关闭所有的过渡动画 客户端浏览器性能低时建议默认开启)
        layoutMode: 'vertical',// 默认布局 现有横向布局 (horizontal) 纵向布局 (vertical) 和分割布局 (split) 共三种
        sidebarStatus: true,// 侧边栏默认是否开启 (折叠)
        language: 'zh-cn',// 默认语言 现有 zh-cn , en 两种
        size: 'medium',// 默认界面大小 有 big (大) , medium (中) , small (小) 三种
        mainTransitionAnimation: 'fade'//主界面过渡动画 目前有 enlarge(放大),fade(横移褪色),threeDRotate(3D旋转) 三种 可自行添加
    },
    waterMark: {
        text: '内部测试版,严禁外泄!!!',//水印文字
        open: false// 是否开启水印
    },
    baseApi: process.env.NODE_ENV === "development" ?// 向后端发送请求时的 基本地址
        "http://127.0.0.1:8080" :// dev
        "http://127.0.0.1:8080"// build
}