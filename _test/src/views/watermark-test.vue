<template>
    <button @click="openWatermark()">开启水印</button>
    <button @click="clearWatermark()">清除水印</button>
</template>
<script setup>
import {ref} from "vue";
import {Watermark} from "../../../index.js";

const text = ref("水印内容");

if (!window.__watermark) {
    window.__watermark = new Watermark();
}

function openWatermark() {
    window.__watermark.openWatermark();
}

function clearWatermark() {
    window.__watermark.clearWatermark();
}


</script>

<style scoped>

</style>
