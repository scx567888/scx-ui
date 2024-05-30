<template>
    <button @click="show=!show">点击</button>
    <scx-panel v-model="show" class="my">
        <scx-panel-item v-for="i in 10">
            {{ i }}
        </scx-panel-item>
    </scx-panel>

</template>

<script setup>
import {ref} from "vue";

const show = ref(false);

</script>

<style scoped>
.my {
    display: grid;
    grid-row-gap: 10px;
}
</style>
