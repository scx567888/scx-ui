import {ScxFetchMethodType} from "./ScxFetchMethodType.js";
import {ResponseNotOKError} from "./ResponseNotOKError.js";
import {ScxFetchResponse} from "./ScxFetchResponse.js";
import {FetchError} from "./FetchError.js";
import {ScxFetchHeaders} from "./ScxFetchHeaders.js";
import {ScxFetchResponseType} from "./ScxFetchResponseType.js";
import {initDefaultOptions, ScxFetchOptions} from "./ScxFetchOptions.js";
import {createRequestInit, mixinOptions, setMethod, setRequestBody, setRequestHeaders} from "./ScxFetchHelper.js";
import {notNull} from "../../vanilla-util/index.js";

/**
 *  ScxFetch : 针对 fetch 的简单封装
 */
class ScxFetch {

    /**
     * 默认配置
     *
     */
    defaultOptions = initDefaultOptions();

    /**
     * a
     */
    baseURL;

    /**
     *
     *
     * @param {string|URL} baseURL
     */
    constructor(baseURL = null) {
        if (notNull(baseURL)) {
            this.baseURL = new URL(baseURL);
        }
    }

    /**
     * 基本的 req
     * @param  url {URL | string}
     * @param  body {Object}
     * @param  options {ScxFetchOptions}
     * @returns {Promise<ScxFetchResponse>}
     */
    req(url, body = {}, options = {}) {
        const {
            method,
            headers,
            responseType,
            usePreInterceptor,
            usePostInterceptor,
            charset,
        } = mixinOptions(this.defaultOptions, options);

        const requestInit = createRequestInit(method);//初始化 fetch 参数 , 此处携带 cookie

        const finalURL = notNull(this.baseURL) ? new URL(url, this.baseURL) : new URL(url);//创建 url

        setRequestBody(requestInit, body, finalURL, charset);//设置 body 并根据 body 类型设置请求头

        setRequestHeaders(requestInit, headers);//设置请求头 放在 setRequestBody 后以保证 options 中的 headers 可以覆盖 setRequestBody 中设置的值

        const finalInit = usePreInterceptor ? this.preInterceptor(requestInit) : requestInit;

        //此处进行特殊处理 1, 处理返回结果 2, 将非 2xx 的状态码表示为错误
        const result = new Promise((resolve, reject) => fetch(finalURL, finalInit).then(res => {
            if (!res.ok) {
                reject(new ResponseNotOKError(res));
            } else {
                // resolve 的参数是 Promise 时会直接调用 参数的 resolve
                resolve(ScxFetchResponse.create(res, responseType));
            }
        }).catch(error => reject(new FetchError(error))));

        return usePostInterceptor ? this.postInterceptor(result) : result;
    }

    /**
     * 前置处理器
     * @param request {RequestInit}
     * @returns {RequestInit}
     */
    preInterceptor(request) {
        return request;
    }

    /**
     * 后置处理器
     * @param response {Promise<ScxFetchResponse>}
     * @returns {Promise<*>}
     */
    postInterceptor(response) {
        return response;
    }

    /**
     * GET 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {Promise<unknown>}
     */
    get(url, body = null, options = {}) {
        return this.req(url, body, setMethod(ScxFetchMethodType.GET, options));
    }

    /**
     * POST 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {Promise<unknown>}
     */
    post(url, body = null, options = {}) {
        return this.req(url, body, setMethod(ScxFetchMethodType.POST, options));
    }

    /**
     * PUT 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {Promise<unknown>}
     */
    put(url, body = null, options = {}) {
        return this.req(url, body, setMethod(ScxFetchMethodType.PUT, options));
    }

    /**
     * DELETE 方法
     * @param {URL | string} url
     * @param {Object} body
     * @param options {ScxFetchOptions}
     * @returns {Promise<unknown>}
     */
    delete(url, body = null, options = {}) {
        return this.req(url, body, setMethod(ScxFetchMethodType.DELETE, options));
    }

}

export {
    ScxFetch,
    FetchError,
    ResponseNotOKError,
    ScxFetchOptions,
    ScxFetchResponse,
    ScxFetchHeaders,
    ScxFetchResponseType,
};
