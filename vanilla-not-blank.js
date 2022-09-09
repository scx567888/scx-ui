/**
 * 判断字符串 不为空
 * @param str
 * @returns {boolean}
 */
function notBlank(str) {
    return str !== undefined && str !== null ? str.toString().trim() !== '' : false;
}

export {
    notBlank
}