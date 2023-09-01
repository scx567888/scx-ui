import {isFunction, isObject} from "./vanilla/type-helper.js";
import {notNull} from "./vanilla/object-helper";

/**
 * 获取视图的上下界限
 * @return {{top: number, left: number, bottom: number, right: number}}
 */
function getViewBounds() {
    //当前视图的宽高
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    //计算上下界限
    return {left: 0, top: 0, right: clientWidth, bottom: clientHeight};
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
    dragIng = false;

    //用户自定义的 上下界
    bounds;

    //用户自定义的 回调
    callback = {
        onClick: (el) => {
        }, onDrag: (el) => {
        }, onDragEnd: (el) => {
        },
    };

    //上下界限 用于加速计算
    minLeft;
    minTop;
    maxLeft;
    maxTop;

    /**
     *
     * @param targetElement
     * @param dragElement
     * @param callback
     * @param bounds {Function||{top,left,bottom,right}}
     */
    constructor(targetElement, {dragElement, callback, bounds} = {}) {
        this.targetElement = targetElement;
        this.dragElement = dragElement ? dragElement : targetElement; //默认使用 targetElement
        this.callback = callback;
        this.bounds = bounds;// 自定义的界限
        //强制绑定 this 指向
        this.onMousedown = this.onMousedown.bind(this);
        this.onMousemove = this.onMousemove.bind(this);
        this.onMouseup = this.onMouseup.bind(this);
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

    onMousedown(event) {
        //获取鼠标初始点击位置
        this.startX = event.clientX;
        this.startY = event.clientY;

        //获取元素当前的矩阵状态
        this.startMatrix = new DOMMatrix(window.getComputedStyle(this.targetElement).transform);

        //获取元素当前的位置
        const {left, top, bottom, right} = this.targetElement.getBoundingClientRect();

        //计算上下界限
        const bounds = this.getBounds();

        //计算上下界限
        this.minLeft = bounds.left - left;
        this.minTop = bounds.top - top;
        this.maxLeft = bounds.right - right;
        this.maxTop = bounds.bottom - bottom;

        document.addEventListener("mousemove", this.onMousemove);
        document.addEventListener("mouseup", this.onMouseup);
    }

    onMousemove(event) {
        if (this.isMove(event.clientX, event.clientY)) {
            this.update(event.clientX, event.clientY);
            if (!this.dragIng) {
                this.callOnDrag();
                this.dragIng = true;
            }
        }
    }

    onMouseup(e) {
        this.dragIng = false;
        if (this.isMove(e.clientX, e.clientY)) {
            this.callOnDragEnd();
        } else {
            this.callOnClick();
        }
        document.removeEventListener("mousemove", this.onMousemove);
        document.removeEventListener("mouseup", this.onMouseup);
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

    callOnDrag() {
        if (notNull(this.callback) && isFunction(this.callback.onDrag)) {
            this.callback.onDrag(this.targetElement);
        }
    }

    callOnDragEnd(e) {
        if (notNull(this.callback) && isFunction(this.callback.onDragEnd)) {
            this.callback.onDragEnd(this.targetElement, this.startMatrix, e);
        }
    }

    callOnClick() {
        if (notNull(this.callback) && isFunction(this.callback.onClick)) {
            this.callback.onClick(this.targetElement);
        }
    }

    enable() {
        this.dragElement.addEventListener("mousedown", this.onMousedown);
        return this;
    }

    disable() {
        this.dragElement.removeEventListener("mousedown", this.onMousedown);
        return this;
    }

}

export {
    ScxDrag,
    getViewBounds,
};
