import vue from '@vitejs/plugin-vue';
import {scxIconPluginUseJS} from '../scx-icon-vite-plugins.js';

export default {
    base: './',
    plugins: [vue({
        template: {
            compilerOptions: {
                //scx-loading 并不是 vue 组件 所以在这里排除
                isCustomElement: tag => ['scx-loading'].includes(tag)
            }
        }
    }), scxIconPluginUseJS(['a'])]
}