const ID_CARD_REG = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
const PHONE_NUMBER_REG = /^1[3456789]\d{9}$/;
const URL_REG = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
const EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * 是否是 合法的 身份证
 * @returns {boolean}
 * @param rule
 * @param value
 * @param callback
 * @param name
 */
function checkIDCard(rule, value, callback, name) {
    if (value && !ID_CARD_REG.test(value)) {
        callback(new Error(name + "格式有误 !!!"));
    } else {
        callback();
    }
}

/**
 * 是否是 合法的 电话号码
 * @returns {boolean}
 * @param rule
 * @param value
 * @param callback
 * @param name
 */
function checkPhoneNumber(rule, value, callback, name) {
    if (value && !PHONE_NUMBER_REG.test(value)) {
        callback(new Error(name + "格式有误 !!!"));
    } else {
        callback();
    }
}

/**
 * 是否是 合法的 邮箱地址
 * @returns {Boolean}
 * @param rule
 * @param value
 * @param callback
 * @param name
 */
function checkEmail(rule, value, callback, name) {
    if (value && !EMAIL_REG.test(value)) {
        callback(new Error(name + "格式有误 !!!"));
    } else {
        callback();
    }
}

/**
 * 是否是 合法的 url
 * @returns {boolean}
 * @param rule
 * @param value
 * @param callback
 * @param name
 */
function checkURL(rule, value, callback, name) {
    if (value && !URL_REG.test(value)) {
        callback(new Error(name + "格式有误 !!!"));
    } else {
        callback();
    }
}

export {
    EMAIL_REG, URL_REG, PHONE_NUMBER_REG, ID_CARD_REG, checkIDCard, checkPhoneNumber, checkEmail, checkURL,
};
