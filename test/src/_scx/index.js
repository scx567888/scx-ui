import {ScxApiHelper, ScxEventBus, ScxFSS, ScxReq} from "../../../index.js";
import {ScxJsonVoReq} from "../../../scx-json-vo-req.js";

const scxApiHelper = new ScxApiHelper("http://127.0.0.1:8080");

const scxEventBus = new ScxEventBus(scxApiHelper);

const scxReq = new ScxReq(scxApiHelper);

const scxJsonVoReq = new ScxJsonVoReq(scxReq);

const scxFSS = new ScxFSS(scxReq, scxJsonVoReq);

export {
    scxApiHelper,
    scxEventBus,
    scxReq,
    scxJsonVoReq,
    scxFSS
}