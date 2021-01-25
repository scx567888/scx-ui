import './index.css'

//鼠标点击的初始位置 通过此项判断是否执行点击事件
let startX = 0;
let startY = 0;

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


function onMouseUp(e, value, el) {
    //清除事件
    document.onmousemove = null
    document.onmouseup = null
    if (Math.abs(startX - e.clientX) < 10 && Math.abs(startY - e.clientY) < 10) {
        if (value && value.onClick) {
            value.onClick(el)
        }
    } else {
        el.classList.add('drag-moving')
        if (value && value.onCancelDrag) {
            value.onCancelDrag(el);
        }
        setTimeout(() => {
            el.classList.remove('drag-moving')
            if (value && value.onDragEnd) {
                value.onDragEnd(el);
            }
        }, 600);
    }
}

export default {
    name: 'drag',
    //待处理
    mounted(el, {value}) {
        el.onmousedown = (e) => {
            startX = e.clientX
            startY = e.clientY
            el.classList.remove('drag-moving')
            let x = e.clientX - el.offsetLeft;
            let y = e.clientY - el.offsetTop;
            document.onmousemove = (de) => {
                if (Math.abs(startX - de.clientX) > 10 || Math.abs(startY - de.clientY) > 10) {
                    onMouseMove(el, de, x, y);
                    if (value && value.onDragStart) {
                        value.onDragStart(el)
                    }
                }
            }
            document.onmouseup = (de) => onMouseUp(de, value, el)
        }
    },
    updated(el, {value}) {

    }
}
