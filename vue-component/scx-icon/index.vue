<template>
    <svg class="scx-icon">
        <use :href="'#scx-icon_' + icon"></use>
    </svg>
</template>

<script>
import "./index.css";

export default {
    name: "scx-icon",
    props: {
        icon: {
            type: String,
            default: "",
            required: true
        }
    }
};
</script>
