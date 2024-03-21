<template>
    <div style="padding: 10px">
        <textarea v-model="html"/>
        <h3>HTML</h3>
        <div v-html="html">

        </div>
        <h3>TEXT</h3>
        <div>
            {{ text }}
        </div>
    </div>

</template>
<script setup>
import {computed, ref} from "vue";
import {htmlToText} from "../../../index.js";

const html = ref("<h1 style=\"color:red\">123456</h1>");

const text = computed(() => htmlToText(html.value));
</script>

<style scoped>
textarea {
    height: 200px;
    width: 400px;
}
</style>
