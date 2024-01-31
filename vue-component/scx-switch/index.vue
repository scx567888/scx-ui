<template>
    <button :class="{'scx-switch-checked': modelValue}" class="scx-switch" type="button" @click="changeSwitchState">
        <span class="scx-switch-icon">
            <slot name="icon"/>
        </span>
        <span class="scx-switch-label">
            <slot name="label"/>
        </span>
    </button>
</template>
<script>
import "./index.css";

export default {
    name: "scx-switch",
    props: {
        modelValue: Boolean,
        default: false
    },
    emits: ["update:modelValue", "change"],
    setup(props, context) {
        function changeSwitchState() {
            const val = !props.modelValue;
            context.emit("update:modelValue", val);
            context.emit("change", val);
        }

        return {changeSwitchState};
    }
};
</script>
