import {createApp} from 'vue';
import App from './App.vue'; // 根容器
import {scxRouter} from './router/index'; // 路由
import i18n from './i18n/index'; // 国际化
import ElementPlus from 'element-plus'; //element
import 'element-plus/lib/theme-chalk/index.css'; //element 的 样式表
import ScxCommons from './commons/index'; //scx-ui 组件库
import './styles/index.css'; //全局样式表

createApp(App)
    .use(scxRouter)
    .use(i18n)
    .use(ElementPlus)
    .use(ScxCommons)
    .mount('#app');