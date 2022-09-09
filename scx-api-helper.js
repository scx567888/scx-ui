/**
 * ScxApiHelper 类
 */
class ScxApiHelper {

    httpURL;
    webSocketURL;

    constructor(httpURL) {
        if (!ScxApiHelper.isHttpURL(httpURL)) {
            throw new Error("httpURL 必须是一个合法的 HTTP 路径");
        }
        this.httpURL = (httpURL.endsWith("/") ? httpURL.substring(0, httpURL.length - 1) : httpURL).trim();
        const isUseSSL = this.httpURL.startsWith("https://"); //此处判断是否使用了 SSL
        this.webSocketURL = (isUseSSL ? 'wss://' : 'ws://') + this.httpURL.split("://")[1];
    }

    /**
     * 是否是外链
     * @param {string} url
     * @returns {boolean}
     */
    static isExternal(url) {
        return /^(https?:|mailto:|tel:)/.test(url);
    }

    /**
     * 是否是 http 路径
     * @param url
     * @returns {boolean}
     */
    static isHttpURL(url) {
        return /^(https?:)/.test(url);
    }

    /**
     * 清理路径
     * @param url
     * @returns {*|string}
     */
    static cleanURL(url) {
        return url.startsWith("/") ? url : '/' + url;
    }

    /**
     * 拼接 http url
     * @param url
     * @returns {*}
     */
    joinHttpURL(url) {
        return ScxApiHelper.isExternal(url) ? url : this.httpURL + ScxApiHelper.cleanURL(url);
    }

    /**
     * 拼接 webSocket 路径
     * @param url
     * @returns {string}
     */
    joinWebSocketURL(url) {
        return this.webSocketURL + ScxApiHelper.cleanURL(url);
    }

}

export {ScxApiHelper}