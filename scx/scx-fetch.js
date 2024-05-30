import {notNull} from "../util/index.js";
import {inject} from "vue";

//********** 定义一些枚举 ************

class HttpFieldName {
    static CONTENT_TYPE = "Content-Type";
}

class MediaType {
    static APPLICATION_JSON = "application/json";
    static APPLICATION_XML = "application/xml";
    static MULTIPART_FORM_DATA = "multipart/form-data";
    static TEXT_ANY = "text/";
}

class HttpMethod {
    static GET = "GET";
    static POST = "POST";
    static PUT = "PUT";
    static DELETE = "DELETE";
}

class ScxFetchResponseType {

    static ARRAY_BUFFER = "arrayBuffer";
    static BLOB = "blob";
    static FORM_DATA = "formData";
    static JSON = "json";
    static TEXT = "text";
    static AUTO = "auto";

    /**
     * 获取 header 中的 CONTENT_TYPE 判断相应的类型
     * @param headers
     * @param defaultType 优先的返回值
     */
    static getByHeaders(headers, defaultType) {
        if (defaultType && defaultType !== ScxFetchResponseType.AUTO) {
            return defaultType;
        }
        let contentType = headers.get(HttpFieldName.CONTENT_TYPE);
        if (contentType == null) {
            return ScxFetchResponseType.ARRAY_BUFFER;
        }
        contentType = contentType.toLowerCase();
        if (contentType.startsWith(MediaType.APPLICATION_JSON)) {
            return ScxFetchResponseType.JSON;
        } else if (contentType.startsWith(MediaType.TEXT_ANY) || contentType.startsWith(MediaType.APPLICATION_XML)) {
            return ScxFetchResponseType.TEXT;
        } else if (contentType.startsWith(MediaType.MULTIPART_FORM_DATA)) {
            return ScxFetchResponseType.FORM_DATA;
        } else {
            return ScxFetchResponseType.ARRAY_BUFFER;
        }
    }

}

//**************** 异常类型 ******************

class ResponseNotOKError {

    cause;

    constructor(error) {
        this.cause = error;
    }

}

class FetchError {

    cause;

    constructor(error) {
        this.cause = error;
    }

}

//*************** ScxFetch 组件 ******************

class ScxFetchPromise extends Promise {

    abortController;

    then(onfulfilled, onrejected) {
        const s = super.then(onfulfilled, onrejected);
        s.abortController = this.abortController;
        return s;
    }

    catch(onrejected) {
        const s = super.catch(onrejected);
        s.abortController = this.abortController;
        return s;
    }

    finally(onFinally) {
        const s = super.finally(onFinally);
        s.abortController = this.abortController;
        return s;
    }

    cancel(reason) {
        if (this.abortController) {
            this.abortController.abort(reason);
        }
    }

}

/**
 * ScxFetch 响应体
 */
class ScxFetchResponse {

    headers;
    type;
    url;
    responseType;
    body;

    constructor(headers, type, url, body, responseType) {
        this.headers = headers;
        this.type = type;
        this.url = url;
        this.body = body;
        this.responseType = responseType;
    }

    /**
     * 根据 响应类型 获取对应的 body 处理器
     * @param responseType
     * @param response
     * @return {Promise<ArrayBuffer>|ArrayBuffer|Promise<Blob>|Blob|*|Promise<FormData>}
     */
    static getBodyPromise(responseType, response) {
        if (responseType === ScxFetchResponseType.JSON) {
            return response.json();
        } else if (responseType === ScxFetchResponseType.ARRAY_BUFFER) {
            return response.arrayBuffer();
        } else if (responseType === ScxFetchResponseType.BLOB) {
            return response.blob();
        } else if (responseType === ScxFetchResponseType.FORM_DATA) {
            return response.formData();
        } else if (responseType === ScxFetchResponseType.TEXT) {
            return response.text();
        } else {
            return response.arrayBuffer();
        }
    }

    /**
     * 创建 ScxFetchResponse
     * @param response
     * @param defaultResponseType
     * @param useBodyPromise
     * @return {Promise<unknown>}
     */
    static create(response, defaultResponseType, useBodyPromise) {
        return new Promise((resolve, reject) => {
            const responseType = ScxFetchResponseType.getByHeaders(response.headers, defaultResponseType);
            if (useBodyPromise) {
                resolve(new ScxFetchResponse(response.headers, response.type, response.url, ScxFetchResponse.getBodyPromise(responseType, response), responseType));
            } else {
                ScxFetchResponse.getBodyPromise(responseType, response)
                        .then(body => resolve(new ScxFetchResponse(response.headers, response.type, response.url, body, responseType)))
                        .catch(e => reject(e));
            }
        });
    }

}

class ScxFetchOptions {

    /**
     * 方法
     */
    method;

    /**
     * 请求头
     */
    headers;

    /**
     * 默认想如何处理返回值 取值如下 [auto, arrayBuffer, blob, formData, json, text, ]
     *
     */
    responseType;

    /**
     * 是否使用 BodyPromise 如果为 true 则 body 为 Promise 对象, false 则会将 body 数据读完再返回
     * @type {boolean}
     */
    useBodyPromise;

    /**
     * 前置处理器
     * @type {boolean}
     */
    usePreInterceptor;

    /**
     * 后置处理器
     * @type {boolean}
     */
    usePostInterceptor;

    /**
     * 字符集
     */
    charset;
}

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
     * 基本路径
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
     * @returns {ScxFetchPromise<ScxFetchResponse>}
     */
    fetch(url, body = {}, options = {}) {
        const {
            method,
            headers,
            responseType,
            usePreInterceptor,
            usePostInterceptor,
            charset,
            useBodyPromise,
        } = mixinOptions(this.defaultOptions, options);

        const requestInit = createRequestInit(method);//初始化 fetch 参数 , 此处携带 cookie

        const finalURL = notNull(this.baseURL) ? new URL(url, this.baseURL) : new URL(url);//创建 url

        setRequestBody(requestInit, body, finalURL, charset);//设置 body 并根据 body 类型设置请求头

        setRequestHeaders(requestInit, headers);//设置请求头 放在 setRequestBody 后以保证 options 中的 headers 可以覆盖 setRequestBody 中设置的值

        const finalInit = usePreInterceptor ? this.preInterceptor(requestInit) : requestInit;

        //用于取消
        let abortController = new AbortController();
        finalInit.signal = abortController.signal;

        //此处进行特殊处理 1, 处理返回结果 2, 将非 2xx 的状态码表示为错误
        const result = new ScxFetchPromise((resolve, reject) => fetch(finalURL, finalInit).then(res => {
            if (res.ok) {
                // resolve 的参数是 Promise 时会直接调用 参数的 resolve
                resolve(ScxFetchResponse.create(res, responseType, useBodyPromise));
            } else {
                reject(new ResponseNotOKError(res));
            }
        }).catch(error => reject(new FetchError(error))));

        result.abortController = abortController;

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
     * @param response {ScxFetchPromise<ScxFetchResponse>}
     * @returns {ScxFetchPromise<*>}
     */
    postInterceptor(response) {
        return response;
    }

    /**
     * GET 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    get(url, body = null, options = {}) {
        return this.fetch(url, body, setMethod(HttpMethod.GET, options));
    }

    /**
     * POST 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    post(url, body = null, options = {}) {
        return this.fetch(url, body, setMethod(HttpMethod.POST, options));
    }

    /**
     * PUT 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    put(url, body = null, options = {}) {
        return this.fetch(url, body, setMethod(HttpMethod.PUT, options));
    }

    /**
     * DELETE 方法
     * @param {URL | string} url
     * @param {Object} body
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    delete(url, body = null, options = {}) {
        return this.fetch(url, body, setMethod(HttpMethod.DELETE, options));
    }

    /**
     * For VUE
     * @param app
     */
    install(app) {
        app.provide(scxFetchKey, this);
    }

}

//************** 帮助方法 ****************

function createRequestInit(method) {
    return {
        method,
        headers: new Headers(),
        credentials: "include",
        body: null,
    };
}

function setMethod(method, options = {}) {
    options.method = method;
    return options;
}

function setRequestHeaders(requestInit, headers) {
    //循环设置 headers
    if (notNull(headers)) {
        if (headers instanceof Headers) {
            headers.forEach((k, v) => requestInit.headers.set(k, v));
        } else {
            for (const [key, value] of Object.entries(headers)) {
                requestInit.headers.set(key, String(value));
            }
        }
    }
}

function setRequestBody(requestInit, body, url, charset) {
    if (notNull(body)) {
        if (body instanceof FormData) {
            requestInit.body = body;
        } else if (requestInit.method === HttpMethod.GET) {
            for (const [key, value] of Object.entries(body)) {
                url.searchParams.set(key, String(value));
            }
        } else {
            requestInit.headers.set(HttpFieldName.CONTENT_TYPE, `${MediaType.APPLICATION_JSON};charset=${charset}`);
            requestInit.body = JSON.stringify(body);
        }
    }
}

function mixinOptions(defaultOptions, options) {
    return {...defaultOptions, ...options};
}

function initDefaultOptions() {
    const temp = new ScxFetchOptions();
    temp.method = HttpMethod.GET;
    temp.headers = null;
    temp.responseType = ScxFetchResponseType.AUTO;
    temp.useBodyPromise = false;
    temp.usePreInterceptor = false;
    temp.usePostInterceptor = false;
    temp.charset = "utf-8";
    return temp;
}

//************* 针对 vue ********************

const scxFetchKey = "scx-fetch";

/**
 *
 * @returns {ScxFetch}
 */
function useScxFetch() {
    return inject(scxFetchKey);
}

export {
    ScxFetch,
    FetchError,
    ResponseNotOKError,
    ScxFetchOptions,
    ScxFetchResponse,
    ScxFetchPromise,
    ScxFetchResponseType,
    useScxFetch,
};
