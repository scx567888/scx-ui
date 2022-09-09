const HttpHeaderValues = {
    APPLICATION_JSON: "application/json",
    APPLICATION_XML: "application/xml",
    MULTIPART_FORM_DATA: "multipart/form-data"
}

const HttpHeaderNames = {
    CONTENT_TYPE: "content-type"
}

class ResponseNotOKError {

    cause

    constructor(error) {
        this.cause = error;
    }

}

class FetchError {

    cause

    constructor(error) {
        this.cause = error;
    }

}

class ScxReqOptions {

    /**
     * 方法
     */
    method;

    /**
     * 请求头
     */
    headers;

    /**
     *  代表返回值是否特殊处理 为 true 则直接返回 fetch 对象
     */
    originalResults;

    /**
     * 默认想如何处理返回值 取值如下 [auto, arrayBuffer, blob, formData, json, text, ] (注意 originalResults 为 true 时此属性无效)
     *
     */
    defaultResponseType;

    /**
     * 在 fetch 中只有网络错误才会 reject
     * 若此字段为 true  , 则将会对所有非 2xx 范围的相应拒绝
     * 若此字段为 false , 则何 fetch 保持一致
     */
    rejectIfResponseNotOK;

    /**
     * 前置处理器
     * @type {false}
     */
    usePreInterceptor;

    /**
     * 后置处理器
     * @type {false}
     */
    usePostInterceptor;
}

/**
 * 获取 header 中的 CONTENT_TYPE 判断相应的类型
 * @param res
 * @param defaultType 优先的返回值
 */
function getResponseType(res, defaultType) {
    if (defaultType && defaultType !== 'auto') {
        return defaultType;
    }
    let contentType = res.headers.get(HttpHeaderNames.CONTENT_TYPE);
    if (contentType == null) {
        return "arrayBuffer";
    }
    contentType = contentType.toLowerCase();
    if (contentType.startsWith(HttpHeaderValues.APPLICATION_JSON)) {
        return "json"
    } else if (contentType.startsWith("text/") || contentType.startsWith(HttpHeaderValues.APPLICATION_XML)) {
        return "text";
    } else if (contentType.startsWith(HttpHeaderValues.MULTIPART_FORM_DATA)) {
        return "formData"
    } else {
        return "arrayBuffer";
    }
}

function createInit(method) {
    return {
        method,
        headers: new Headers(),
        credentials: 'include',
        body: null
    };
}

/**
 * 参数处理器
 * @param method
 * @param  options {ScxReqOptions}
 * @returns {ScxReqOptions}
 */
function optionsProcessor(method, options = {}) {
    return {...options, method};
}

/**
 *  ScxReq : 针对 fetch 的简单封装
 */
class ScxReq {

    defaultOptions = {
        method: "GET",
        originalResults: false,
        defaultResponseType: "auto",
        rejectIfResponseNotOK: true,
        usePreInterceptor: false,
        usePostInterceptor: false,
    }

    scxApiHelper;

    /**
     *
     * @param scxApiHelper {ScxApiHelper}
     *
     */
    constructor(scxApiHelper) {
        this.scxApiHelper = scxApiHelper;
    }

    static toURLSearchParams(body) {
        if (body) {
            const urlSearchParams = new URLSearchParams();
            //循环设置 body
            for (let k in body) {
                if (body.hasOwnProperty(k)) {
                    urlSearchParams.set(k, body[k]);
                }
            }
            return urlSearchParams.toString();
        } else {
            return "";
        }
    }

    /**
     * 基本的 req
     * @returns {Promise<Object>}
     * @param url
     * @param body {Object}
     * @param options {ScxReqOptions}
     */
    req(url, body = {}, options = {}) {
        let finalURL = this.scxApiHelper.joinHttpURL(url);
        const {
            method = this.defaultOptions.method,
            headers,
            originalResults = this.defaultOptions.originalResults,
            defaultResponseType = this.defaultOptions.defaultResponseType,
            rejectIfResponseNotOK = this.defaultOptions.rejectIfResponseNotOK,
            usePreInterceptor = this.defaultOptions.usePreInterceptor,
            usePostInterceptor = this.defaultOptions.usePostInterceptor,
        } = options;
        //初始化 fetch 参数 , 此处携带 cookie
        const init = createInit(method);
        //根据 body 类型设置请求头
        if (body) {
            if (body instanceof FormData) {
                init.body = body;
            } else if (Object.keys(body).length > 0) {
                if (init.method === 'GET') {
                    finalURL = finalURL + '?' + ScxReq.toURLSearchParams(body);
                } else {
                    init.headers.set(HttpHeaderNames.CONTENT_TYPE, HttpHeaderValues.APPLICATION_JSON + ';charset=utf-8');
                    init.body = JSON.stringify(body);
                }
            }
        }

        if (headers) {
            //循环设置 headers
            for (let k in headers) {
                if (headers.hasOwnProperty(k)) {
                    init.headers.set(k, headers[k]);
                }
            }
        }

        const finalInit = usePreInterceptor ? this.preInterceptor(init) : init;

        let result;

        if (originalResults) {
            result = fetch(finalURL, finalInit);
        } else {
            //此处进行特殊处理 1, 直接返回结果 2, 将非 2xx 的状态码表示为错误
            result = new Promise((resolve, reject) => fetch(finalURL, finalInit).then(res => {
                if (rejectIfResponseNotOK && !res.ok) {
                    reject(new ResponseNotOKError(res));
                    return;
                }
                const type = getResponseType(res, defaultResponseType);
                if (type === "json") {
                    resolve(res.json());
                } else if (type === "arrayBuffer") {
                    resolve(res.arrayBuffer());
                } else if (type === "blob") {
                    resolve(res.blob());
                } else if (type === "formData") {
                    resolve(res.formData());
                } else if (type === "text") {
                    resolve(res.text());
                } else {
                    resolve(res.arrayBuffer());
                }
            }).catch(error => reject(new FetchError(error))));
        }
        return usePostInterceptor ? this.postInterceptor(result) : result;
    }

    /**
     * 前置处理器
     * @param request {RequestInit}
     * @returns {*}
     */
    preInterceptor(request) {
        return request;
    }

    /**
     * 后置处理器
     * @param response {Promise<Object>}
     * @returns {*}
     */
    postInterceptor(response) {
        return response;
    }

    /**
     * GET 方法
     * @param url
     * @param body
     * @param options {ScxReqOptions}
     * @returns {Promise<unknown>}
     */
    get(url, body = null, options = {}) {
        return this.req(url, body, optionsProcessor("GET", options));
    }

    /**
     * POST 方法
     * @param url
     * @param body
     * @param options {ScxReqOptions}
     * @returns {Promise<unknown>}
     */
    post(url, body = null, options = {}) {
        return this.req(url, body, optionsProcessor("POST", options));
    }

    /**
     * PUT 方法
     * @param url
     * @param body
     * @param options {ScxReqOptions}
     * @returns {Promise<unknown>}
     */
    put(url, body = null, options = {}) {
        return this.req(url, body, optionsProcessor("PUT", options));
    }

    /**
     * DELETE 方法
     * @param url
     * @param body
     * @param options {ScxReqOptions}
     * @returns {Promise<unknown>}
     */
    delete(url, body = null, options = {}) {
        return this.req(url, body, optionsProcessor("DELETE", options));
    }

}

export {ScxReq, FetchError, ResponseNotOKError, ScxReqOptions}