import {createApp} from 'vue';
import App from './App.vue';
import {ScxRouter} from './router';
import {ScxComponent} from "../../scx-component.js";
import "../../_scx-theme/default.css";
import "../../_scx-theme/dark.css";
import 'scx-icon/register';
import {ScxReqVueInstall} from "../../_scx-req/ScxReqVueInstall.js";
import {ScxFSSVueInstall} from "../../_scx-fss/ScxFSSVueInstall.js";
import {ScxEventBus} from "../../scx-event-bus.js";
import {ScxReq} from "../../scx-req.js";
import {ScxFSS} from "../../scx-fss.js";
import {ScxEventBusVueInstall} from "../../_scx-event-bus/ScxEventBusVueInstall.js";

const scxEventBus = new ScxEventBus("http://127.0.0.1:8080");
const scxReq = new ScxReq("http://127.0.0.1:8080");
const scxFSS = new ScxFSS(scxReq);

createApp(App)
    .use(ScxRouter)
    .use(ScxComponent)
    .use(new ScxReqVueInstall(scxReq))
    .use(new ScxFSSVueInstall(scxFSS))
    .use(new ScxEventBusVueInstall(scxEventBus))
    .mount('#app');