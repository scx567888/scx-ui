/**
 * 是否是 合法的 身份证
 * @returns {boolean}
 * @param rule
 * @param value
 * @param callback
 */
function checkIdCard(rule, value, callback) {
    if (value === '' || value === undefined) {
        callback(new Error("身份证号不能为空"))
    } else {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(value)) {
            callback(new Error("身份证号有误"))
        } else {
            callback()
        }
    }
}

/**
 * 是否是 合法的 电话号码
 * @returns {boolean}
 * @param rule
 * @param value
 * @param callback
 */
function checkPhoneNumber(rule, value, callback) {
    if (value === '' || value === undefined) {
        callback(new Error("电话号码不能为空"))
    } else {
        const reg = /^1[3456789]\d{9}$/
        if (!reg.test(value)) {
            callback(new Error("电话号码有误"))
        } else {
            callback()
        }
    }
}

/**
 * 是否是 合法的 邮箱地址
 * @returns {Boolean}
 * @param rule
 * @param value
 * @param callback
 */
function checkEmail(rule, value, callback) {
    if (value === '' || value === undefined) {
        callback(new Error("邮箱不能为空"))
    } else {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!reg.test(value)) {
            callback(new Error("邮箱格式有误"))
        } else {
            callback()
        }
    }
}

/**
 * 是否是 合法的 url
 * @returns {boolean}
 * @param rule
 * @param value
 * @param callback
 */
function checkURL(rule, value, callback) {
    if (value === '' || value === undefined) {
        callback(new Error("Url不能为空"))
    } else {
        const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
        if (!reg.test(value)) {
            callback(new Error("Url格式有误"))
        } else {
            callback()
        }
    }
}

export {
    checkIdCard,
    checkPhoneNumber,
    checkEmail,
    checkURL
}