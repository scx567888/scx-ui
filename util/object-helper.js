/**
 *
 * @param o {any}
 * @returns {any}
 */
function deepCopy(o) {
    //这里用一种简单粗暴的方式实现 深拷贝 不过这样会使对象上的方法丢失 不建议用于一些复杂对象
    return JSON.parse(JSON.stringify(o));
}

function isNull(o) {
    return !notNull(o);
}

function notNull(o) {
    return o !== undefined && o !== null;
}

/**
 * 判断字符串 不为空
 * @param str
 * @returns {boolean}
 */
function notBlank(str) {
    return notNull(str) ? str.toString().trim() !== "" : false;
}

function isBlank(str) {
    return !notBlank(str);
}

export {deepCopy, isNull, notNull, isBlank, notBlank};
