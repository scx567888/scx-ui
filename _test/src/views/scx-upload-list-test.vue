<template>
    <div style="width: 700px">
        <scx-upload-list v-model="nowFiles" :before-delete="l" :before-upload="b"/>
        <br>
        <scx-upload-list v-model="nowFiles" disabled/>
        {{ nowFiles }}
    </div>

</template>

<script setup>
import {ref} from "vue";
import {ScxUploadList} from "../../../index.js";

const nowFiles = ref([]);

function b(files) {
    for (let file of files) {
        const arr = file.name.split(".");
        const extName = arr[arr.length - 1];
        if (extName !== "jpg" && extName !== "jpeg" && extName !== "png") {
            alert("文件必须是图片");
            return false;
        }
    }
    return true;
}

function l(a) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(a);
            alert("不允许删除");
            a.previewURL = "123";
            resolve(false);
        }, 1000);
    });
}
</script>
