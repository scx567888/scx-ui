<template>
    <transition :name="'scx-panel-t_'+transitionType">
        <div v-show="modelValue" class="scx-panel">
            <slot/>
        </div>
    </transition>
</template>

<script>
import "./index.css";

export default {
    name: "scx-panel",
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        transitionType: {
            type: String,
            default: "left-top"
        }
    },
    setup(props, context) {

    }
};
</script>
