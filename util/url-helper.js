import {notBlank} from "./object-helper.js";

/**
 * 是否是外链
 * @param {string} url
 * @returns {boolean}
 */
function isExternal(url) {
    return /^(https?:|mailto:|tel:)/.test(url);
}

/**
 * 是否是 http 路径
 * @param url
 * @returns {boolean}
 */
function isHttpURL(url) {
    return /^(https?:)/.test(url);
}

/**
 * 清理路径
 * @param url
 * @returns {*|string}
 */
function cleanURL(url) {
    return url.join("/").split("/").filter(notBlank).join("/");
}


/**
 * 拼接 http url
 * @returns {*}
 * @param baseURL
 * @param urls
 */
function joinURL(baseURL, ...urls) {
    return new URL(cleanURL(urls), baseURL);
}

export {
    isExternal, isHttpURL, cleanURL, joinURL,
};
