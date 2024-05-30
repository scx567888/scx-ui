<template>
    <div class="scx-progress">
        <div :style="{width: modelValue+'%',backgroundColor:color}" class="scx-progress-bar">
            <div class="scx-progress-bar-text">{{ modelValue }} %</div>
        </div>
    </div>
</template>

<script>
import "./index.css";

export default {
    name: "scx-progress",
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: ""
        }
    }
};
</script>

<style scoped>

</style>
