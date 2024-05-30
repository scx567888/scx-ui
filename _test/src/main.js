import {createApp} from "vue";
import App from "./App.vue";
import {Router} from "./router";
import {ScxComponent, ScxFSS, ScxReq} from "../../index.js";
import "../../style/default.css";
import "../../style/dark.css";
import "scx-icon/register";

const scxReq = new ScxReq("http://127.0.0.1:8081");
const scxFSS = new ScxFSS(scxReq);

createApp(App)
    .use(Router)
    .use(ScxComponent)
    .use(scxReq)
    .use(scxFSS)
    .mount("#app");
