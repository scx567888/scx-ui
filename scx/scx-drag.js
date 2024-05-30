import {isFunction, isObject, rafThrottle} from "../util/index.js";

/**
 * 获取视图的上下界限
 * @return {{top: number, left: number, bottom: number, right: number}}
 */
function getViewBounds() {
    //当前视图的宽高
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    //计算上下界限
    return {
        left: 0,
        top: 0,
        right: clientWidth,
        bottom: clientHeight,
    };
}

class ScxDrag {

    /**
     * 目标元素
     */
    targetElement;

    /**
     * 可拖拽区域元素
     */
    dragElement;

    //存取鼠标按下时的初始状态 (包含元素的初始矩阵,鼠标位置,上下界限等)
    startX;
    startY;
    startMatrix;

    //判断为点击事件的距离
    v = 10;

    //当前状态
    isMoving = false;

    //用户自定义的 上下界
    bounds;

    //用户自定义的 回调
    onClick;
    onDragStart;
    onDrag;
    onDragEnd;

    //上下界限 用于加速计算
    minLeft;
    minTop;
    maxLeft;
    maxTop;

    //当前触摸点 
    nowTouch;

    /**
     *
     * @param targetElement
     * @param dragElement
     * @param callback
     * @param bounds {Function||{top,left,bottom,right}}
     */
    constructor(targetElement, {
        dragElement = targetElement, //默认使用 targetElement
        onClick = (el) => {
        },
        onDragStart = (el) => {
        },
        onDrag = (el) => {
        },
        onDragEnd = (el) => {
        },
        bounds,// 自定义的界限
    } = {}) {
        this.targetElement = targetElement;
        this.dragElement = dragElement;
        this.onClick = onClick;
        this.onDragStart = onDragStart;
        this.onDrag = onDrag;
        this.onDragEnd = onDragEnd;
        this.bounds = bounds;
        //节流
        this.update = rafThrottle(this.update);
        //强制绑定 this 指向 防止 addEventListener 改变 this 指向
        this.onMousedown = this.onMousedown.bind(this);
        this.onMousemove = this.onMousemove.bind(this);
        this.onMouseup = this.onMouseup.bind(this);
        this.onTouchstart = this.onTouchstart.bind(this);
        this.onTouchmove = this.onTouchmove.bind(this);
        this.onTouchend = this.onTouchend.bind(this);
    }

    //获取上下界 默认采用 浏览器视图
    getBounds() {
        if (isFunction(this.bounds)) {
            return this.bounds(getViewBounds());
        } else if (isObject(this.bounds)) {
            return this.bounds;
        } else {
            return getViewBounds();
        }
    }

    //判断坐标与start 的差值是否小于指定值
    isMove(x, y) {
        return Math.abs(this.startX - x) > this.v || Math.abs(this.startY - y) > this.v;
    }

    //当多指移动时 我们只需要获取当前的移动事件
    filterTouchEvent(event) {
        let touch;
        for (let changedTouch of event.changedTouches) {
            if (changedTouch.identifier === this.nowTouch.identifier) {
                touch = changedTouch;
            }
        }
        return touch;
    }

    onMousedown(event) {
        //我们只响应左键
        if (event.button !== 0) {
            return;
        }
        //获取鼠标初始点击位置
        this.onStart(event.clientX, event.clientY);

        document.addEventListener("mousemove", this.onMousemove);
        document.addEventListener("mouseup", this.onMouseup);
    }

    onTouchstart(event) {
        //停止事件传播
        event.stopPropagation();
        event.preventDefault();
        //设置最后一个 触摸点
        this.nowTouch = event.changedTouches[event.changedTouches.length - 1];

        this.onStart(this.nowTouch.clientX, this.nowTouch.clientY);

        document.addEventListener("touchmove", this.onTouchmove);
        document.addEventListener("touchend", this.onTouchend);
    }

    onMousemove(event) {
        this.onMove(event.clientX, event.clientY);
    }

    onTouchmove(event) {
        let touch = this.filterTouchEvent(event);
        if (touch) {
            this.onMove(touch.clientX, touch.clientY);
        }
    }

    onMouseup(e) {
        this.onEnd(e);
        document.removeEventListener("mousemove", this.onMousemove);
        document.removeEventListener("mouseup", this.onMouseup);
    }

    onTouchend(e) {
        let touch = this.filterTouchEvent(e);
        if (touch) {
            this.onEnd(e);
            document.removeEventListener("touchmove", this.onTouchmove);
            document.removeEventListener("touchend", this.onTouchend);
        }
    }

    onStart(x, y) {
        this.startX = x;
        this.startY = y;

        //获取元素当前的矩阵状态
        this.startMatrix = new DOMMatrix(window.getComputedStyle(this.targetElement).transform);

        //获取元素当前的位置
        const {
            left,
            top,
            bottom,
            right,
        } = this.targetElement.getBoundingClientRect();

        //计算上下界限
        const bounds = this.getBounds();

        //计算上下界限
        this.minLeft = bounds.left - left;
        this.minTop = bounds.top - top;
        this.maxLeft = bounds.right - right;
        this.maxTop = bounds.bottom - bottom;
    }

    onMove(x, y) {
        if (this.isMoving || this.isMove(x, y)) {
            this.update(x, y);
            if (!this.isMoving) {
                this.isMoving = true;
                this.onDragStart(this.targetElement);
            }
            this.onDrag(this.targetElement);
        }
    }

    onEnd(e) {
        //需等待 update 完成后 
        this.update.cancel();
        if (this.isMoving) {
            this.onDragEnd(this.targetElement, this.startMatrix, e);
        } else {
            this.onClick(this.targetElement);
        }
        this.isMoving = false;
    }

    update(X, Y) {
        let moveX = Math.min(Math.max(X - this.startX, this.minLeft), this.maxLeft);
        let moveY = Math.min(Math.max(Y - this.startY, this.minTop), this.maxTop);
        //todo 这里若元素有放大旋转等操作会导致错误的移动
        //这里距离需要进行重新计算
        moveX = moveX / this.startMatrix.a;
        moveY = moveY / this.startMatrix.d;
        //旋转等操作待处理

        const newMatrix = this.startMatrix.translate(moveX, moveY);

        this.targetElement.style.transform = newMatrix.toString();
    }

    enable() {
        this.dragElement.addEventListener("mousedown", this.onMousedown);
        this.dragElement.addEventListener("touchstart", this.onTouchstart);
        return this;
    }

    disable() {
        this.dragElement.removeEventListener("mousedown", this.onMousedown);
        this.dragElement.removeEventListener("touchstart", this.onTouchstart);
        return this;
    }

}

export {
    ScxDrag,
    getViewBounds,
};
