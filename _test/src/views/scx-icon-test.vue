<template>
    <div class="test-app" style="padding: 10px">
        <h2>点击图标即可复制代码</h2>
        <h3>填充图标 {{ filledIconList.length }} 个</h3>
        <div style="display: flex;flex-wrap: wrap">
            <div v-for="item in filledIconList" :data-clipboard-text="copyIcon('filled-'+item)" class="icon-item">
                <scx-icon :icon="'filled-'+item"/>
            </div>
        </div>
        <h3>线框图标 {{ outlinedIconList.length }} 个</h3>
        <div style="display: flex;flex-wrap: wrap">
            <div v-for="item in outlinedIconList" :data-clipboard-text="copyIcon('outlined-'+item)" class="icon-item">
                <scx-icon :icon="'outlined-'+item"/>
            </div>
        </div>
    </div>

</template>

<script>
import ClipboardJS from "clipboard";

export default {
    name: "icon-test",
    setup() {

        const getSvgNameList = (allModules) => {
            const svgNameList = [];
            for (const path in allModules) {
                if (allModules.hasOwnProperty(path)) {
                    let fileName = path.split("/").pop().replace(/\..+$/, "");
                    svgNameList.push(fileName);
                }
            }
            return svgNameList;
        };
        const filledIconList = getSvgNameList(import.meta.glob("../../../vite-plugin/scx-icon-vite-plugin/default-svg-icons/filled/*.svg"), {eager: true});
        const outlinedIconList = getSvgNameList(import.meta.glob("../../../vite-plugin/scx-icon-vite-plugin/default-svg-icons/outlined/*.svg", {eager: true}));

        function copyIcon(icon) {
            return `<scx-icon icon="${icon}"/>`;
        }

        const clipboard = new ClipboardJS(".icon-item");

        clipboard.on("success", function (e) {
            alert("复制成功 !!! " + e.text);
            e.clearSelection();
        });

        clipboard.on("error", function (e) {
            alert("复制成功 !!! " + e.text);
        });

        return {
            filledIconList,
            outlinedIconList,
            copyIcon
        };
    }
};
</script>

<style>
.icon-item {
    width: 50px;
    height: 50px;
    border: 2px solid #6f7ad3;
    margin: 5px;
    transition: transform 80ms;
}

.icon-item:hover {
    transform: scale(1.1);
}

.icon-item > .scx-icon {
    width: 100%;
    height: 100%;
}

.test-app svg {
    fill: #489349;
}
</style>
