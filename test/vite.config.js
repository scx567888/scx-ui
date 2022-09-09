import vuePlugin from '@vitejs/plugin-vue';
import {scxIconPlugin} from '../scx-icon-vite-plugins.js';

export default {
    base: './',
    plugins: [vuePlugin({
        template: {
            compilerOptions: {
                //scx-loading 并不是 vue 组件 所以在这里排除
                isCustomElement: tag => ['scx-loading'].includes(tag)
            }
        }
    }), scxIconPlugin({type: 'js', svgRoot: ['a']})]
}