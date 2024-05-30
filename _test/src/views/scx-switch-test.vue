<template>
    <scx-switch v-for="i in 200" v-model="b">

    </scx-switch>
    <scx-switch v-for="i in 200" v-model="c">

    </scx-switch>
</template>

<script setup>
import {computed, ref} from "vue";

const b = ref(true);

const c = computed({
    get() {
        return !b.value;
    },
    set(v) {
        b.value = !v;
    }
});

</script>


<style scoped>

</style>
