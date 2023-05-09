import {ScxFetchResponseType} from "./_scx-fetch/ScxFetchResponseType.js";
import {JsonVOError} from "./_scx-req/JsonVOError.js";
import {ScxFetch} from "./scx-fetch.js";
import {isNull} from "./vanilla/object-helper.js";
import {inject} from "vue";

/**
 *
 * @param {Promise<ScxFetchResponse>} r
 * @returns {Promise<unknown>}
 */
function jsonVoProcessor(r) {
    //这里是特殊处理
    return new Promise((resolve, reject) => r.then(res => {
        const {responseType, body} = res;
        if (responseType === ScxFetchResponseType.JSON) {
            if (body.message === 'ok') {
                resolve(body.data);
            } else {
                reject(new JsonVOError(body));
            }
        } else {
            resolve(res);
        }
    }).catch(error => reject(error)));
}

/**
 * 通过 scx-req 发送的请求我们默认都是 json 格式的
 * @param {ScxFetchOptions} options
 * @returns {ScxFetchOptions}
 */
function setResponseType(options = {}) {
    if (isNull(options.responseType)) {
        options.responseType = ScxFetchResponseType.JSON;
    }
    return options;
}

/**
 * 针对后台的 JsonVo 和 DataJsonVo 对 ScxFetch 进行一次包装
 * 1, 将 JsonVo.ok() 和 JsonVo.fail() 区分开
 * 2, 解构 JsonVo 返回的 data 字段
 */
class ScxReq {

    scxFetch;

    baseURL;

    constructor(scxFetch) {
        if (scxFetch instanceof ScxFetch) {
            this.scxFetch = scxFetch;
        } else {
            this.scxFetch = new ScxFetch(scxFetch);
        }
        this.baseURL = this.scxFetch.baseURL;
    }

    /**
     * GET 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {Promise<unknown>}
     */
    get(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxFetch.get(url, body, setResponseType(options)));
    }

    /**
     * POST 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {Promise<unknown>}
     */
    post(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxFetch.post(url, body, setResponseType(options)));
    }

    /**
     * PUT 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {Promise<unknown>}
     */
    put(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxFetch.put(url, body, setResponseType(options)));
    }

    /**
     * DELETE 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {Promise<unknown>}
     */
    delete(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxFetch.delete(url, body, setResponseType(options)));
    }

    install(app) {
        app.provide(scxReqKey, this);
    }

}


/**
 *
 * @type {string}
 */
const scxReqKey = 'scx-req';

/**
 *
 * @returns {ScxReq}
 */
function useScxReq() {
    return inject(scxReqKey);
}


export {ScxReq, JsonVOError, scxReqKey, useScxReq}
