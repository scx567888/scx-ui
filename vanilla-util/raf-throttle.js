/**
 * 使用 requestAnimationFrame 进行节流
 * @param callback
 * @return 带有节流的 callback
 */
function rafThrottle(callback) {
    let requestId = null;
    const throttled = function (...arg) {
        if (requestId) {
            return;
        }
        requestId = requestAnimationFrame(() => {
            requestId = null;
            callback.apply(this, arg);
        });
    };
    throttled.cancel = () => {
        cancelAnimationFrame(requestId);
        requestId = null;
    };
    return throttled;
}

export {rafThrottle};
