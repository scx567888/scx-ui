<template>
    <div>
        <div style="display: flex;flex-direction: column;row-gap: 5px">
            <scx-progress v-model="value"/>
            <scx-progress v-model="value" color="green"/>
            <scx-progress v-model="value" color="red"/>
            <scx-progress v-model="value" color="orange"/>
        </div>

        {{ value }}
        <input v-model="value" max="100" min="0" style="width: 200px;" type="range">
    </div>

</template>

<script setup>
import {ref} from "vue";

const value = ref(33.3);
</script>

<style scoped>

</style>
