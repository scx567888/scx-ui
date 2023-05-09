<template>
    <div style="display: flex;height: 200%;position: absolute;
    width: 100%;padding: 5px;box-sizing: border-box">
        <div v-contextmenu="options1"
             style="height: 200px;width: 200px;background: #3a8ee6;margin-right: 20px;flex-shrink: 0;">
            {{ message1 }}
            <input v-model="testValue"/>
        </div>
        <div style="height: 200px;width: 200px;background: #5faa62;margin-right: 20px; flex-shrink: 0;">
            <div v-for="i in 3" style="height: 50px;width: 100%;background: #a2743c;margin-bottom: 5px"
                 @contextmenu.prevent="(e)=>showContextMenu1(e,i)">
                {{ i }}
            </div>
            右键点黄色块
        </div>

        <div style="height: 100%;width: 100%;background: #fd8787" @contextmenu.prevent="(e)=>showContextMenu1(e,9)">
            右键点红色块的边缘区域 会发现菜单在无法从左上角(默认)展开时(空间不够)会自动调整出现的区域
            <div v-contextmenu="options1"
                 style="height: 200px;width: 200px;background: #b466e9;margin-right: 20px;flex-shrink: 0;">
                内部的菜单
                {{ message1 }}
                <input v-model="testValue"/>
            </div>
        </div>

    </div>
</template>

<script setup>
import {h, ref} from "vue";
import {showContextMenu} from "../../../index.js";

const message1 = ref("右键点我");
const testValue = ref("");


const options1 = [
    {
        label: "选项1",
        callback: () => {
            message1.value = "选项1";
        }
    },
    {
        label: "选项2",
        callback: () => {
            message1.value = "选项2";
        }
    },
    {
        label: "选项3 (点击会关闭菜单)",
        callback: (c) => {
            message1.value = "选项3";
            c();
        }
    },
    {
        label: () => h("input", {
            value: testValue.value,
            "onInput": e => testValue.value = e.target.value
        }),
        callback: () => {

        }
    },
];


function showContextMenu1(e) {
    showContextMenu(e, [
        {
            label: "超宽的菜单项超宽的菜单项超宽的菜单项超宽的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超宽的菜单项超宽的菜单项超宽的菜单项超宽的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超宽的菜单项超宽的菜单项超宽的菜单项超宽的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超宽的菜单项超宽的菜单项超宽的菜单项超宽的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超长的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超长的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超长的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超长的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超长的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超长的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超长的菜单项",
            callback: (c) => {
                c();
            }
        },
        {
            label: "超长的菜单项",
            callback: (c) => {
                c();
            }
        },
    ]);
}

</script>

<style scoped>

</style>
