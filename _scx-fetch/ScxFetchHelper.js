import {HttpHeaderNames} from "./HttpHeaderNames.js";
import {HttpHeaderValues} from "./HttpHeaderValues.js";
import {notNull} from "../vanilla-object-helper";

/**
 *
 * @param method
 * @returns {RequestInit}
 */
function createRequestInit(method) {
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
 * @param  options {ScxFetchOptions | Object}
 * @returns {ScxFetchOptions}
 */
function setMethod(method, options = {}) {
    options.method = method;
    return options;
}

/**
 *
 * @param {RequestInit} requestInit
 * @param {Headers | Object} headers
 */
function setRequestHeaders(requestInit, headers) {
    //循环设置 headers
    if (notNull(headers)) {
        if (headers instanceof Headers) {
            headers.forEach((k, v) => requestInit.headers.set(k, v))
        } else {
            for (const [key, value] of Object.entries(headers)) {
                requestInit.headers.set(key, String(value));
            }
        }
    }
}

/**
 *
 * @param {RequestInit} requestInit
 * @param {Object} body
 * @param {URL} url
 * @param {string} charset
 */
function setRequestBody(requestInit, body, url, charset) {
    if (notNull(body)) {
        if (body instanceof FormData) {
            requestInit.body = body;
        } else if (requestInit.method === 'GET') {
            for (const [key, value] of Object.entries(body)) {
                url.searchParams.set(key, String(value));
            }
        } else {
            requestInit.headers.set(HttpHeaderNames.CONTENT_TYPE, `${HttpHeaderValues.APPLICATION_JSON};charset=${charset}`);
            requestInit.body = JSON.stringify(body);
        }
    }
}

/**
 *
 * @param defaultOptions
 * @param options
 * @returns {ScxFetchOptions}
 */
function mixinOptions(defaultOptions, options) {
    return {...defaultOptions, ...options};
}

export {createRequestInit, setMethod, setRequestHeaders, setRequestBody, mixinOptions}