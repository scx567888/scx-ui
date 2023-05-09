//将焦点定位到 提示错误的 第一项上
import {nextTick} from "vue";

function focusFirstErrorElement() {
    nextTick(() => {
        const firstIsErrorElement = document.querySelector(".is-error input");
        if (firstIsErrorElement) {
            firstIsErrorElement.focus();
        }
    }).finally();
}

export {focusFirstErrorElement};
