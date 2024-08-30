import vue from "@vitejs/plugin-vue";
import {scxIconPluginUseJS} from "../vite-plugin/index.js";
import {scxLoadingPlugin} from "../vite-plugin/scx-loading-vite-plugin/index.js";

export default {
    base: "./",
    plugins: [
        vue({}),
        scxIconPluginUseJS(["no-icons"]),
        scxLoadingPlugin(),
    ],
};
