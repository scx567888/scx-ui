/**
 * 此处是缓动函数 用于 pagination 更改之后的页面滚动
 */

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) {
        return c / 2 * t * t + b
    }
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
}

let requestAnimFrame = (function () {
    return window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    }
})();

/**
 * 移动页面
 * @param {number} amount
 */
function move(amount) {
    document.getElementsByClassName("scx-main-content")[0].scrollTop = amount
}

function position() {
    return document.getElementsByClassName("scx-main-content")[0].scrollTop
}

/**
 * 页面滚动函数 网上找的 看不懂 先这么用
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
function scrollTo(to, duration, callback) {
    const start = position()
    const change = to - start
    const increment = 20
    let currentTime = 0
    duration = (typeof (duration) === 'undefined') ? 500 : duration
    const animateScroll = function () {
        currentTime += increment
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        move(val)
        if (currentTime < duration) {
            requestAnimFrame(animateScroll)
        } else {
            if (callback && typeof (callback) === 'function') {
                callback()
            }
        }
    };
    animateScroll()
}

export {
    scrollTo
}