import {createApp, reactive} from 'vue';
import App from './App.vue';
import {ScxRouter} from './router';
import {ScxComponent} from "../../scx-component.js";
import "../../_scx-theme/default.css";
import "../../_scx-theme/dark.css";
import 'scx-icon/register';
import {ScxEventBus} from "../../scx-event-bus.js";
import {ScxReq} from "../../scx-req.js";
import {ScxFSS} from "../../scx-fss.js";
import {ScxUserInfo} from "../../scx-user-info.js";

const scxEventBus = new ScxEventBus("http://127.0.0.1:8080");
const scxReq = new ScxReq("http://127.0.0.1:8080");
const scxFSS = new ScxFSS(scxReq);
const scxUserInfo = reactive(new ScxUserInfo());

createApp(App)
    .use(ScxRouter)
    .use(ScxComponent)
    .use(scxReq)
    .use(scxFSS)
    .use(scxEventBus)
    .use(scxUserInfo)
    .mount('#app');