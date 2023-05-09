<template>
    <div>
        <button type="button" @click="exportXLSX()">点击导出</button>
        <button type="button" @click="exportXLSX1()">打包导出</button>
    </div>
</template>

<script>
import {createExcel, download, exportExcel} from "../../../index.js";
import JSZip from "jszip";

export default {
    name: "scx-xlsx-test",
    setup() {

        function exportXLSX() {
            const headTranslation = {
                name: "姓名",
                idCard: "身份证号码",
                age: "年龄",
            };
            const data = [];
            for (let i = 0; i < 999; i++) {
                data.push({
                    name: "张三" + 1,
                    age: i,
                    idCard: "202001999192929" + i
                });
            }
            exportExcel("导出的文件", data, headTranslation);
        }

        function exportXLSX1() {
            const headTranslation = {
                name: "姓名",
                idCard: "身份证号码",
                age: "年龄",
            };
            const data = [];
            for (let i = 0; i < 999; i++) {
                data.push({
                    name: "张三" + 1,
                    age: i,
                    idCard: "202001999192929" + i
                });
            }
            const zip = new JSZip();
            for (let i = 0; i < 10; i++) {
                zip.file("导出的表格_" + i + ".xlsx", createExcel(data, headTranslation));
            }
            zip.generateAsync({type: "blob"}).then(c => download(c, "所有文件.zip"));
        }

        return {
            exportXLSX,
            exportXLSX1
        };
    }
};
</script>

<style scoped>

</style>
