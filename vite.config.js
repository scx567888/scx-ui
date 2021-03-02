import viteSpriteSvg from './src/utils/plugin/vite-sprite-svg';
import vue from '@vitejs/plugin-vue'

export default {
    server: {
        port: 9999,
    },
    base: './',
    resolve: {
        alias: {'/@': __dirname + '/src'},
    },
    plugins: [vue(), viteSpriteSvg({iconPrefix: 'scx-icon-', svgRootPath: __dirname + '/src/icons'})]
}
