import {HttpHeaderNames} from "./HttpHeaderNames.js";
import {HttpHeaderValues} from "./HttpHeaderValues.js";

function createInit(method) {
    return {
        method, headers: new Headers(), credentials: 'include', body: null
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

function setURLSearchParams(url, body) {
    if (body) {
        //循环设置 body
        for (let k in body) {
            if (body.hasOwnProperty(k)) {
                url.searchParams.set(k, body[k]);
            }
        }
    }
}

function setHeaders(init, headers) {
    if (headers) {
        //循环设置 headers
        for (let k in headers) {
            if (headers.hasOwnProperty(k)) {
                init.headers.set(k, headers[k]);
            }
        }
    }
}

function setBody(init, body, url, charset) {
    if (body) {
        if (body instanceof FormData) {
            init.body = body;
        } else if (Object.keys(body).length > 0) {
            if (init.method === 'GET') {
                setURLSearchParams(url, body);
            } else {
                init.headers.set(HttpHeaderNames.CONTENT_TYPE, `${HttpHeaderValues.APPLICATION_JSON};charset=${charset}`);
                init.body = JSON.stringify(body);
            }
        }
    }
}


function mixinOptions(defaultOptions, options) {
    return {...defaultOptions, ...options};
}

export {createInit, setMethod, setHeaders, setBody, mixinOptions}