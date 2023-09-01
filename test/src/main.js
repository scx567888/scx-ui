import {createApp, reactive} from "vue";
import App from "./App.vue";
import {ScxRouter} from "./router";
import {
    ScxClusteredEventBusVueInstaller,
    ScxComponent,
    ScxFSSVueInstaller,
    ScxReqVueInstaller,
    ScxUserInfo,
    ScxUserInfoVueInstaller
} from "../../vue-component/index.js";
import "../../_scx-theme/default.css";
import "../../_scx-theme/dark.css";
import "scx-icon/register";
import {ScxClusteredEventBus, ScxFSS, ScxReq} from "../../index.js";

const scxClusteredEventBus = new ScxClusteredEventBus("http://127.0.0.1:8080");
const scxReq = new ScxReq("http://127.0.0.1:8080");
const scxFSS = new ScxFSS(scxReq);
const scxUserInfo = reactive(new ScxUserInfo());

createApp(App)
    .use(ScxRouter)
    .use(ScxComponent)
    .use(new ScxReqVueInstaller(scxReq))
    .use(new ScxFSSVueInstaller(scxFSS))
    .use(new ScxClusteredEventBusVueInstaller(scxClusteredEventBus))
    .use(new ScxUserInfoVueInstaller(scxUserInfo))
    .mount("#app");
