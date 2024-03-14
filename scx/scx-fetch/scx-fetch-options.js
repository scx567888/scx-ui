import {ScxFetchMethodType} from "./ScxFetchMethodType.js";
import {ScxFetchResponseType} from "./ScxFetchResponseType.js";

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

function initDefaultOptions() {
    const temp = new ScxFetchOptions();
    temp.method = ScxFetchMethodType.GET;
    temp.headers = null;
    temp.responseType = ScxFetchResponseType.AUTO;
    temp.usePreInterceptor = false;
    temp.usePostInterceptor = false;
    temp.charset = "utf-8";
    return temp;
}

export {ScxFetchOptions, initDefaultOptions};
