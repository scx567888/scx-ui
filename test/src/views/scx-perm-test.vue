<template>
    <div>
        <div>
            全局显示 {{ aaa }}
            用户权限 {{ userInfo.pageElementPerms }}
            用户管理员 {{ userInfo.isAdmin }}
        </div>
        <div v-if="aaa">
            <button v-perm="'hasThis'" type="button" @click="show()">一个按钮</button>
            <button v-perm="'hasThis1'" type="button" @click="show1()">另个按钮</button>
            <button v-perm="['hasThis2']" type="button" @click="show1()">另个按钮2</button>
        </div>

        <!--  todo 不建议这么写 建议使用上方写法(套一层) v-if 和 v-perm 同时使用会导致很多意想不到的错误  -->
        <!--   <button type="button" v-if="aaa" v-perm="'hasThis'" @click="show()">一个按钮</button>-->
        <!--   <button type="button" v-if="aaa" v-perm="'hasThis1'" @click="show1()">另个按钮</button>-->
        <!--   <button type="button" v-if="aaa"  v-perm="['hasThis2']" @click="show1()" >另个按钮2</button>-->

    </div>
</template>

<script setup>
import {ref} from "vue";
import {useScxUserInfo} from "../../../vue-component/index.js";

const aaa = ref(true);

const userInfo = useScxUserInfo();

setInterval(() => {
    if (userInfo.pageElementPerms.length === 0) {
        userInfo.pageElementPerms = ["hasThis", "hasThis2"];
    } else {
        userInfo.pageElementPerms = [];
    }
}, 500);

setInterval(() => {
    userInfo.isAdmin = !userInfo.isAdmin;
}, 800);

setInterval(() => {
    aaa.value = !aaa.value;
}, 100);

function show() {
    alert("点击事件");
}

function show1() {
    alert("点击事件1");
}

</script>

<style scoped>

</style>
