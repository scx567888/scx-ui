import fs from "fs";
import path from "path";

function getSvgDom(path, svgName) {
    let svgDom = fs.readFileSync(path, 'utf-8');
    return svgDom.replace('<svg', '<symbol id="' + svgName + '"')
        .replace(/(height)="[\s\S]+?"/, '')
        .replace(/(width)="[\s\S]+?"/, '')
        .replace(/(xmlns)="[\s\S]+?"/, '')
        .replace('svg>', 'symbol>')
        .replace(/\t/g, '')
        .replace(/\r/g, '')
        .replace(/\n/g, '');
}

export default ({iconPrefix, svgRootPath}) => {
    let spriteSvgDom = [];
    spriteSvgDom.push('<svg style="display: none">');

    new function readFileList(dir = svgRootPath) {
        const files = fs.readdirSync(dir);
        files.forEach((item, index) => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                readFileList(path.join(dir, item)); //递归读取文件
            } else {
                const split = fullPath.split('\\');
                const iconType = split[split.length - 2];
                const svgName = iconPrefix + iconType + '_' + item.split('.')[0];
                spriteSvgDom.push(getSvgDom(fullPath, svgName));
            }
        });
    }

    spriteSvgDom.push('</svg>');
    console.warn(`vite-sprite-svg : 已处理图标 "${spriteSvgDom.length - 2}" 个 !!!`);
    return {
        name: 'vite-sprite-svg',
        transformIndexHtml(html) {
            return html.replace('<body>', '<body> \n ' + spriteSvgDom.join(''))
        }
    }
}
