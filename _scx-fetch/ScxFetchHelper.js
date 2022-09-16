import {HttpHeaderNames} from "./HttpHeaderNames.js";
import {HttpHeaderValues} from "./HttpHeaderValues.js";

/**
 *
 * @param method
 * @returns {RequestInit}
 */
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
 * @param  options {ScxFetchOptions}
 * @returns {ScxFetchOptions}
 */
function setMethod(method, options = {}) {
    options.method = method;
    return options;
}

/**
 *
 * @param {RequestInit} init
 * @param {Headers|Object} headers
 */
function setHeaders(init, headers) {
    //循环设置 headers
    if (headers !== null && headers !== undefined) {
        if (headers instanceof Headers) {
            headers.forEach((k, v) => init.headers.set(k, v))
        } else {
            for (const [key, value] of Object.entries(headers)) {
                init.headers.set(key, String(value));
            }
        }
    }
}

/**
 *
 * @param {RequestInit} init
 * @param {Object} body
 * @param {URL} url
 * @param {string} charset
 */
function setBody(init, body, url, charset) {
    if (body !== null && body !== undefined) {
        if (body instanceof FormData) {
            init.body = body;
        } else if (Object.keys(body).length > 0) {
            if (init.method === 'GET') {
                for (const [key, value] of Object.entries(body)) {
                    url.searchParams.set(key, String(value));
                }
            } else {
                init.headers.set(HttpHeaderNames.CONTENT_TYPE, `${HttpHeaderValues.APPLICATION_JSON};charset=${charset}`);
                init.body = JSON.stringify(body);
            }
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

export {createInit, setMethod, setHeaders, setBody, mixinOptions}