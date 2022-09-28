import {createApp, reactive} from 'vue';
import App from './App.vue';
import {ScxRouter} from './router';
import {ScxComponent} from "../../scx-component.js";
import "../../_scx-theme/default.css";
import "../../_scx-theme/dark.css";
import 'scx-icon/register';
import {ScxReqVueInstaller} from "../../_scx-req/ScxReqVueInstaller.js";
import {ScxFSSVueInstaller} from "../../_scx-fss/ScxFSSVueInstaller.js";
import {ScxEventBus} from "../../scx-event-bus.js";
import {ScxReq} from "../../scx-req.js";
import {ScxFSS} from "../../scx-fss.js";
import {ScxEventBusVueInstaller} from "../../_scx-event-bus/ScxEventBusVueInstaller.js";
import {ScxUserInfo} from "../../scx-user-info.js";
import {ScxUserInfoVueInstaller} from "../../_scx-user-info/ScxUserInfoVueInstaller.js";

const scxEventBus = new ScxEventBus("http://127.0.0.1:8080");
const scxReq = new ScxReq("http://127.0.0.1:8080");
const scxFSS = new ScxFSS(scxReq);
const scxUserInfo = reactive(new ScxUserInfo());

createApp(App)
    .use(ScxRouter)
    .use(ScxComponent)
    .use(new ScxReqVueInstaller(scxReq))
    .use(new ScxFSSVueInstaller(scxFSS))
    .use(new ScxEventBusVueInstaller(scxEventBus))
    .use(new ScxUserInfoVueInstaller(scxUserInfo))
    .mount('#app');