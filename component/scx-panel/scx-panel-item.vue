<template>
    <div :class="{active}" class="scx-panel-item">
        <slot/>
    </div>
</template>

<script>
import "./scx-panel-item.css";

export default {
    name: "scx-panel-item",
    props: {
        active: {
            type: Boolean,
            default: false
        }
    },
    setup() {

    }
};
</script>
