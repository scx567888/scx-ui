<template>
    <div style="height: 2000px">
        <label>
            自动归位
            <input v-model="autoBack" type="checkbox">
        </label>

        <div style="display: flex;flex-wrap: wrap">

            <div v-for="i in 100" ref="div2Ref" v-drag="getValue(i)" :style="{background:getColor(),color:getColor()}"
                 class="scx-drag-test-div2">
                {{ i }}
            </div>

        </div>

        <div ref="ggg"
             style="width: 1000px;height: 500px;position: relative;border: 1px solid red;margin:50px;resize: both;overflow: hidden">
            <div ref="rightRef" class="scx-drag-test-div-wrapper right">
                <div :style="{background:getColor(),color:getColor()}" class="scx-drag-test-div1">
                    吸附右侧
                </div>
            </div>

            <div ref="topRef" class="scx-drag-test-div-wrapper top">
                <div :style="{background:getColor(),color:getColor()}" class="scx-drag-test-div1">
                    吸附上侧
                </div>
            </div>

            <div ref="leftRef" class="scx-drag-test-div-wrapper left">
                <div :style="{background:getColor(),color:getColor()}" class="scx-drag-test-div1">
                    吸附左侧
                </div>
            </div>

            <div ref="bottomRef" class="scx-drag-test-div-wrapper bottom">
                <div :style="{background:getColor(),color:getColor()}" class="scx-drag-test-div1">
                    吸附下侧
                </div>
            </div>

            <div ref="hhh" :style="{background:getColor(),color:getColor()}" style="width: 200px;height: 200px;">
                <div ref="jjj" :style="{background:getColor(),color:getColor()}" style="width: 100%;height: 30px; cursor: move;user-select: none;">
                    只有这里可以拖拽呦
                </div>
                这里不可以拓展呦
                <input type="text">
                <input type="password">
                <button type="button">一个按钮</button>
            </div>

        </div>


    </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useScxDrag} from "../../../index.js";

const autoBack = ref(false);

const div2Ref = ref();
const rightRef = ref();
const topRef = ref();
const leftRef = ref();
const bottomRef = ref();
const ggg = ref();
const hhh = ref();
const jjj = ref();

function getValue(i) {
    return {
        onClick: (el) => {
            el.style.backgroundColor = getColor();
            el.style.color = getColor();
            console.log(i + " : onClick");
        },
        onDragStart: (el) => {
            console.log(i + " : onDragStart");
            el.classList.add("dragging");
        },
        onDrag: (el) => {
            console.log(i + " : onDrag");
        },
        onDragEnd: (el) => {
            if (autoBack.value) {
                el.style.transform = "unset";
            }
            console.log(i + " : onDragEnd");
            el.classList.remove("dragging");
        }
    };
}

function getDragEvent(i) {
    return {
        onClick: (el) => {
            console.log(i + " : onClick");
        },
        onDragStart: (el) => {
            el.classList.add("dragging");
            console.log(i + " : onDragStart");
        },
        onDragEnd: (el, startMatrix) => {
            console.log(i + " : onDragEnd");
            el.classList.remove("dragging");
            let nowMatrix = new DOMMatrix(window.getComputedStyle(el).transform);
            //清楚我们不需要的坐标
            if (i === "top" || i === "bottom") {
                nowMatrix = nowMatrix.translate(0, -nowMatrix.f);
            } else if (i === "left" || i === "right") {
                nowMatrix = nowMatrix.translate(-nowMatrix.e, 0);
            }
            el.style.transform = nowMatrix.toString();
            el.classList.add("ttt");
            el.addEventListener("transitionend", (e) => {
                if (e.target === el) {
                    el.classList.remove("ttt");
                }
            });
        }
    };
}

function getColor() {
    return "#" + Math.random().toString(16).slice(-6);
}

onMounted(() => {

    watch(autoBack, (v) => {
        if (v) {
            for (let div2RefKey in div2Ref.value) {
                div2Ref.value[div2RefKey].style.transform = "unset";
            }
        }
    }, {immediate: true});


    const getO = (i) => {
        return {
            ...getDragEvent(i),
            bounds: function (a) {
                return ggg.value.getBoundingClientRect();
            }
        };
    };

    useScxDrag(leftRef.value, getO("left"));
    useScxDrag(topRef.value, getO("top"));
    useScxDrag(rightRef.value, getO("right"));
    useScxDrag(bottomRef.value, getO("bottom"));

    useScxDrag(hhh.value, {
        dragElement: jjj.value,
        bounds: function (a) {
            return ggg.value.getBoundingClientRect();
        }
    });

});

</script>

<style scoped>
.scx-drag-test-div2 {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: move;
    user-select: none;
    transition: all 300ms ease-out;
}

.scx-drag-test-div-wrapper {
    z-index: 1;
    position: absolute;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: move;
    user-select: none;

}

.scx-drag-test-div-wrapper.right {
    right: 0px;
    top: 200px;
}

.scx-drag-test-div-wrapper.bottom {
    bottom: 0px;
    left: 200px;
}

.scx-drag-test-div-wrapper.top {
    top: 0px;
    left: 200px;
}

.scx-drag-test-div-wrapper.left {
    left: 0px;
    top: 200px;
}

.transform-none {
    transform: none;
}

.scx-drag-test-div1 {
    z-index: 1;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: move;
    user-select: none;
    transition: all 300ms ease-in;
}

.dragging {
    transition: none;
}

@keyframes r {

    0% {
        transform: rotate(0deg) scale(1);
    }

    50% {
        transform: rotate(180deg) scale(0.8);
    }
    100% {
        transform: rotate(360deg) scale(1);
    }

}

.dragging > .scx-drag-test-div1 {
    border-radius: 50%;
    animation: r 300ms linear infinite;
    background: darkmagenta !important;
    border-right-color: #0d6efd;
    border-left-color: #fe0953;
    border-bottom-color: #45fe06;
    border-top-color: #fff700;
    border-width: 4px;
    border-style: solid;
    box-sizing: border-box;
}

.ttt {
    transition: all 300ms ease-out;
}
</style>
