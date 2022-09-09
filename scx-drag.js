class dragState {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.dragIng = false;
        this.onClick = (el) => {
        };
        this.onDrag = (el) => {
        };
        this.onDragEnd = (el) => {
        };
    }
}

//判断坐标与start 的差值是否小于指定值
function isMove(ds, x, y, v) {
    return Math.abs(ds.startX - x) > v || Math.abs(ds.startY - y) > v;
}

function onMouseMove(el, e, x, y) {
    // 获取拖拽元素的位置
    let left = e.clientX - x;
    let top = e.clientY - y;
    // 把拖拽元素 放到 当前的位置
    if (left <= 0) {
        left = 0;
    } else if (left >= document.documentElement.clientWidth - el.offsetWidth) {
        left = document.documentElement.clientWidth - el.offsetWidth;
    }
    if (top <= 0) {
        top = 0;
    } else if (top >= document.documentElement.clientHeight - el.offsetHeight) {
        top = document.documentElement.clientHeight - el.offsetHeight
    }
    el.style.left = left + "px";
    el.style.top = top + "px"
}

function getDragState(value) {
    const temp = new dragState();
    if (value) {
        if (value.onClick) {
            temp.onClick = value.onClick
        }
        if (value.onDrag) {
            temp.onDrag = value.onDrag
        }
        if (value.onDragEnd) {
            temp.onDragEnd = value.onDragEnd
        }
    }
    return temp;
}

const ScxDragDirective = {
    name: 'drag',
    mounted(el, {value}) {
        const ds = getDragState(value);
        //兼容 移动端
        el.ontouchstart = (e) => {
            //停止事件传播
            e.stopPropagation();
            e.preventDefault();
            ds.startX = e.touches[0].clientX;
            ds.startY = e.touches[0].clientY;
            let x = e.touches[0].clientX - el.offsetLeft;
            let y = e.touches[0].clientY - el.offsetTop;
            document.ontouchmove = (de) => {
                if (isMove(ds, de.touches[0].clientX, de.touches[0].clientY, 10)) {
                    //进行鼠标拖拽事件
                    onMouseMove(el, de.touches[0], x, y);
                    if (!ds.dragIng) {
                        ds.onDrag(el)
                        ds.dragIng = true
                    }
                }
            }
            document.ontouchend = (de) => {
                document.ontouchmove = null;
                document.ontouchend = null;
                ds.dragIng = false;
                //根据鼠标移动的距离判断是什么事件 x y 都 小于 10
                if (isMove(ds, de.changedTouches[0].clientX, de.changedTouches[0].clientY, 10)) {
                    ds.onDragEnd(el);
                } else {
                    ds.onClick(el);
                }
            }
        }
        //pc端
        el.onmousedown = (e) => {
            //我们只响应左键
            if (e.button !== 0) {
                return;
            }
            ds.startX = e.clientX;
            ds.startY = e.clientY;
            let x = e.clientX - el.offsetLeft;
            let y = e.clientY - el.offsetTop;
            document.onmousemove = (de) => {
                if (isMove(ds, de.clientX, de.clientY, 10)) {
                    //进行鼠标拖拽事件
                    onMouseMove(el, de, x, y);
                    if (!ds.dragIng) {
                        ds.onDrag(el)
                        ds.dragIng = true
                    }
                }
            }
            document.onmouseup = (de) => {
                document.onmousemove = null;
                document.onmouseup = null;
                ds.dragIng = false;
                //根据鼠标移动的距离判断是什么事件 x y 都 小于 10
                if (isMove(ds, de.clientX, de.clientY, 10)) {
                    ds.onDragEnd(el);
                } else {
                    ds.onClick(el);
                }
            }
        }
    },
    updated(el, {value}) {

    }
}

export {ScxDragDirective}