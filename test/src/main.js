import {createApp} from 'vue';
import App from './App.vue';
import {ScxRouter} from './router';
import {ScxComponent} from "../../scx-component.js";
import "../../_scx-theme/default.css";
import "../../_scx-theme/dark.css";
import 'scx-icon/register';

createApp(App)
    .use(ScxRouter)
    .use(ScxComponent)
    .mount('#app');