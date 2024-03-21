import {createApp, reactive} from "vue";
import App from "./App.vue";
import {ScxRouter} from "./router";
import {
    ScxClusteredEventBus,
    ScxClusteredEventBusVueInstaller,
    ScxComponent,
    ScxFSS,
    ScxFSSVueInstaller,
    ScxReq,
    ScxReqVueInstaller,
    ScxUserInfo,
    ScxUserInfoVueInstaller,
} from "../../index.js";
import "../../style/default.css";
import "../../style/dark.css";
import "scx-icon/register";

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
