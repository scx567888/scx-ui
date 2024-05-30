<template>
    <div>
        大写
        <scx-input v-model="m1" type="text"/>
        小写
        <scx-input v-model="m2" type="text"/>
    </div>

</template>

<script>
import {computed, ref} from "vue";

export default {
    name: "home",
    setup() {
        //测试相互依赖的属性 防止互相依赖导致无限循环浏览器崩溃
        //tinymce 也可以用此方法改写
        const m1 = ref("");
        const m2 = computed({
            get() {
                return m1.value.toUpperCase();
            },
            set(value) {
                m1.value = value.toLowerCase();
            }
        });
        return {
            m1,
            m2
        };
    }
};
</script>

<style scoped>

</style>
