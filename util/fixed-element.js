/**
 * 将元素移除文档流并固定在原位置 一般用在 before-leave 上 使用方法如下
 *     <transition-group name="xxx" @before-leave="fixedElement">
 *       <div v-for="(item,i) in list" :key="item">
 *          {{item}}
 *       </div>
 *     </transition-group>
 * @param el
 */
function fixedElement(el) {
    const {
        marginLeft,
        marginTop,
        width,
        height,
    } = window.getComputedStyle(el);
    el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`;
    el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`;
    el.style.width = width;
    el.style.height = height;
    el.style.position = "absolute";
}

export {
    fixedElement,
};
