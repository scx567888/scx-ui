<template>
    <div class="app">
        <router-link class="fff" to="/">Home</router-link>
        <router-link class="fff" to="/scx-contextmenu-test">右键菜单测试</router-link>
        <router-link class="fff" to="/scx-drag-test">拖动测试</router-link>
        <router-link class="fff" to="/scx-eventbus-test">事件总线测试</router-link>
        <router-link class="fff" to="/scx-icon-test">图标测试</router-link>
        <router-link class="fff" to="/scx-xlsx-test">XLSX导出测试</router-link>
        <router-link class="fff" to="/scx-crud-test">ScxCrud测试</router-link>
        <router-link class="fff" to="/scx-group-test">ScxGroup测试</router-link>
        <router-link class="fff" to="/list-to-tree-test">ListToTree测试</router-link>
        <router-link class="fff" to="/scx-upload-test">ScxUpload 测试</router-link>
        <router-link class="fff" to="/scx-upload-list-test">ScxUploadList 测试</router-link>
        <router-link class="fff" to="/scx-loading-test">ScxLoading 测试</router-link>
        <router-link class="fff" to="/scx-perm-test">ScxPerm 测试</router-link>
        <router-link class="fff" to="/html-to-text-test">HtmlToText 测试</router-link>
        <router-link class="fff" to="/watermark-test">水印测试</router-link>
        <router-link class="fff" to="/scx-switch-test">ScxSwitch</router-link>
        <scx-switch v-model="b"></scx-switch>点击切换主题
    </div>

    <router-view/>
</template>

<script>
import {ref, watch} from "vue";
import {changeTheme} from "../../index.js";
import ScxSwitch from "../../vue-component/scx-switch/index.vue";

export default {
    name: "App",
    components: {ScxSwitch},
    setup() {
        const b = ref(false);

        watch(b,(v)=>{
            changeTheme(v);
        })

        return {
            b
        };
    }
};
</script>

<style scoped>
.fff {
    color: var(--scx-text-color);
}

.app {
    width: 100%;
    border-bottom: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    column-gap: 10px;
    flex-wrap: wrap;
    row-gap: 10px;
    box-sizing: border-box;
}
</style>
