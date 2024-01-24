<template>
    <div ref="scxContextMenuRef" class="scx-context-menu" @contextmenu.prevent="">
        <div v-for="item in contextMenuItems" class="scx-context-menu-item" @click="callItemCallBack(item)">
            <component :is="renderLabel(item)"></component>
        </div>
    </div>
</template>

<script>
//todo 多级菜单 ?
import "./index.css";
import {nextTick, onMounted, ref} from "vue";
import {closeContextMenu} from "./index.js";
import {isFunction} from "../../util/index.js";

export default {
    name: "scx-context-menu",
    props: {
        mouseEvent: MouseEvent,
        contextMenuItems: Array
    },
    setup(props, context) {
        const scxContextMenuRef = ref(null);

        //设置初始状态 保证元素可以正确的获取的内容大小以便后续计算
        function initStatus() {
            scxContextMenuRef.value.style.top = 0;
            scxContextMenuRef.value.style.left = 0;
            scxContextMenuRef.value.style.visibility = "hidden";
        }

        function setStatus(top, left, type) {
            scxContextMenuRef.value.classList.add(type);
            scxContextMenuRef.value.style.top = top + "px";
            scxContextMenuRef.value.style.left = left + "px";
            scxContextMenuRef.value.style.visibility = "unset";
        }

        function show(mouseEvent) {
            initStatus();
            //todo 或者用 clientX ?
            let x = mouseEvent.pageX;
            let y = mouseEvent.pageY;
            const clientWidth = window.innerWidth;
            const clientHeight = window.innerHeight;
            nextTick(() => {
                const {
                    width,
                    height
                } = scxContextMenuRef.value.getBoundingClientRect();
                //todo 这里还可以做优化 以保证 菜单展示不下的时候出现滚动条 通过设置 height 和 width 实现
                const top = clientHeight > height + y ? y : y - height;
                const type = clientHeight > height + y ? "top" : "bottom";
                const left = clientWidth > width + x ? x : x - width;
                setStatus(top, left, type);
            });
        }

        function callItemCallBack(item) {
            if (item.callback) {
                item.callback(closeContextMenu);
            } else {
                closeContextMenu();
            }
        }

        function renderLabel(c) {
            const {label} = c;
            if (isFunction(label)) {
                return label;
            } else {
                return () => label;
            }
        }

        onMounted(() => show(props.mouseEvent));

        return {
            scxContextMenuRef,
            callItemCallBack,
            renderLabel
        };
    }

};
</script>
