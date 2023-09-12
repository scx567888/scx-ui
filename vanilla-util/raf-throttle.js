/**
 * 使用 requestAnimationFrame 进行节流
 * @param callback
 * @return 带有节流的 callback
 */
function rafThrottle(callback) {
    let needRAF = true;
    return function (...arg) {
        if (!needRAF) {
            return;
        }
        needRAF = false;
        requestAnimationFrame(() => {
            needRAF = true;
            callback.apply(this, arg);
        });
    };
}

export {rafThrottle};
