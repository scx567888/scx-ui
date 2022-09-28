/**
 *
 * @param o {any}
 * @returns {any}
 */
function deepCopy(o) {
    //这里用一种简单粗暴的方式实现 深拷贝 不过这样会使对象上的方法丢失 不建议用于一些复杂对象
    return JSON.parse(JSON.stringify(o));
}

export {deepCopy}