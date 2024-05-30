<template>
    <div class="scx-input">
        <scx-icon v-if="icon" :icon="icon"/>
        <input v-model="m" :placeholder="placeholder" type="text"/>
        <scx-icon v-show="m!==''" icon="outlined-close" @click="m=''"/>
    </div>
</template>

<script>
import "./index.css";
import {computed} from "vue";

export default {
    name: "scx-input",
    props: {
        modelValue: {
            type: String,
            required: true,
            default: "",
        },
        placeholder: {
            type: String,
            default: "输入名称搜索",
        },
        icon: {
            type: String,
            default: null
        }
    },
    setup(props, context) {

        const m = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                context.emit("update:modelValue", value);
            }
        });

        return {m};
    }
};
</script>
