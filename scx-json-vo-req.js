class JsonVOError {

    constructor(error) {
        Object.assign(this, error);
    }

}

function jsonVoProcessor(r) {
    //这里是特殊处理
    return new Promise((resolve, reject) => {
        r.then(d => {
            if (d.message === 'ok') {
                resolve(d.data);
            } else {
                reject(new JsonVOError(d));
            }
        }).catch(error => reject(error));
    })
}

function optionsProcessor(options = {}) {
    return {...options, defaultResponseType: "json"};
}

/**
 * 针对后台的 JsonVo 和 DataJsonVo 对 ScxReq 进行一次包装
 * 1, 将 JsonVo.ok() 和 JsonVo.fail() 区分开
 * 2, 解构 JsonVo 返回的 data 字段
 */
class ScxJsonVoReq {

    scxReq

    constructor(scxReq) {
        this.scxReq = scxReq;
    }

    /**
     * GET 方法
     * @param url
     * @param body
     * @param options {ScxReqOptions}
     * @returns {Promise<unknown>}
     */
    get(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxReq.get(url, body, optionsProcessor(options)));
    }

    /**
     * POST 方法
     * @param url
     * @param body
     * @param options {ScxReqOptions}
     * @returns {Promise<unknown>}
     */
    post(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxReq.post(url, body, optionsProcessor(options)));
    }

    /**
     * PUT 方法
     * @param url
     * @param body
     * @param options {ScxReqOptions}
     * @returns {Promise<unknown>}
     */
    put(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxReq.put(url, body, optionsProcessor(options)));
    }

    /**
     * DELETE 方法
     * @param url
     * @param body
     * @param options {ScxReqOptions}
     * @returns {Promise<unknown>}
     */
    delete(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxReq.delete(url, body, optionsProcessor(options)));
    }

}

export {ScxJsonVoReq, JsonVOError}