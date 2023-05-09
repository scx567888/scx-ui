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
        <button @click="f1">点击切换主题</button>
    </div>

    <router-view/>
</template>

<script>
import {ref} from "vue";
import {changeTheme} from "../../_scx-theme/index.js";

export default {
    name: "App",
    setup() {
        const b = ref(false);

        function f1() {
            b.value = !b.value;
            changeTheme(b.value);
        }

        return {
            b,
            f1
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
