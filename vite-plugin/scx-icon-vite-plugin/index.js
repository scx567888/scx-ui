import {dirname, extname, join, posix, relative, resolve, win32} from "path";
import {fileURLToPath} from "url";
import {readdirSync, readFileSync, statSync} from "fs";
import {svgToSymbol} from "./svg-to-symbol.js";

const SCX_ICON_REGISTER_ID = "scx-icon/register";

const SVG_DOM_ID = "__scx__icon__dom__" + new Date().getTime() + "__";

const SVG_SYMBOL_ID_PREFIX = "scx-icon_";

function getSymbolId(relativePath) {
    return SVG_SYMBOL_ID_PREFIX + relativePath.substring(0, relativePath.length - 4).split("/").filter(s => s).join("-");
}

function getFileContent(absolutePath) {
    return readFileSync(absolutePath, "utf-8");
}

class ScxIconInterface {

    name;

    /**
     * svgRoots
     */
    svgRoots;

    /**
     * 缓存
     */
    allSymbolCache;

    constructor(svgRoots) {
        this.svgRoots = svgRoots;
    }

    async getAllSymbol() {
        if (!this.allSymbolCache) {
            this.allSymbolCache = await this.createAllSymbol();
        }
        return this.allSymbolCache;
    }

    async createAllSymbol() {
        const svgSymbolList = [];
        for (let svgRoot of this.svgRoots) {
            const allSVGFiles = getAllSVGFiles(svgRoot);
            for (const {
                relativePath,
                absolutePath
            } of allSVGFiles) {
                const symbolContent = svgToSymbol(getSymbolId(relativePath), getFileContent(absolutePath));
                //内容不为空 添加
                if (symbolContent) {
                    svgSymbolList.push(symbolContent);
                }
            }
            console.log(this.name + ` : ${svgRoot} , 已处理图标 ${allSVGFiles.length} 个 !!!`);
        }
        return svgSymbolList.join("");
    }

}

class UseHtml extends ScxIconInterface {

    name = "scx-icon:use-html";

    async transformIndexHtml() {
        const allSymbol = await this.getAllSymbol();
        return [{
            tag: "svg",
            attrs: {
                id: SVG_DOM_ID,
                style: "display: none",
            },
            children: allSymbol,
            injectTo: "body",
        }];
    }

}

class UseJS extends ScxIconInterface {

    name = "scx-icon:use-js";

    /**
     * 缓存
     */
    moduleJsCodeCache;

    async load(id) {
        //只有 构建时才执行此方法
        if (SCX_ICON_REGISTER_ID === id) {
            return await this.getModuleJsCode();
        }
    }

    async getModuleJsCode() {
        if (!this.moduleJsCodeCache) {
            this.moduleJsCodeCache = this.createModuleJsCode();
        }
        return this.moduleJsCodeCache;
    }

    /**
     * 获取 js 文件
     * @returns {string}
     */
    async createModuleJsCode() {
        const allSymbol = await this.getAllSymbol();
        return `if (typeof window !== 'undefined') {

    function loadScxIconSvg() {
        let svgDom = document.getElementById('${SVG_DOM_ID}');
        if (!svgDom) {
            svgDom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgDom.id = '${SVG_DOM_ID}';
            svgDom.style.display = 'none';
        }
        svgDom.innerHTML = ${JSON.stringify(allSymbol)};
        document.body.appendChild(svgDom);
    }

    if (document.readyState === 'interactive') {
        document.addEventListener('DOMContentLoaded', loadScxIconSvg);
    } else {
        loadScxIconSvg()
    }

}`;
    }

}

const defaultSVGRoot = resolve(dirname(fileURLToPath(import.meta.url)), "./default-svg-icons");

function cleanSVGRoot(svgRoot) {
    if (Array.isArray(svgRoot)) {
        return [defaultSVGRoot, ...svgRoot].map(s => resolve(s));
    } else {
        return [defaultSVGRoot, svgRoot].map(s => resolve(s));
    }
}

/**
 *
 * @returns Object
 * @param svgRoot
 */
function scxIconPluginUseJS(svgRoot = []) {
    const useJS = new UseJS(cleanSVGRoot(svgRoot));
    return {
        name: useJS.name,
        load(id) {
            return useJS.load(id);
        },
        resolveId(id) {
            if (SCX_ICON_REGISTER_ID === id) {
                return id;
            }
        },
    };
}

/**
 *
 * @returns Object
 * @param svgRoot
 */
function scxIconPluginUseHtml(svgRoot = []) {
    const useHtml = new UseHtml(cleanSVGRoot(svgRoot));
    return {
        name: useHtml.name,
        load(id) {
            if (SCX_ICON_REGISTER_ID === id) {
                return "";
            }
        },
        resolveId(id) {
            if (SCX_ICON_REGISTER_ID === id) {
                return id;
            }
        },
        transformIndexHtml(html) {
            return useHtml.transformIndexHtml(html);
        },
    };
}

/**
 * 这里全部使用 '/' 而不是 window 的 '\'
 * @param filename
 * @returns {string}
 */
function normalizePath(filename) {
    return filename.split(win32.sep).join(posix.sep);
}

function getAllSVGFiles(root) {
    const svgFiles = [];
    walkTree(root, f => {
        if (!f.isDirectory) {
            let ext = extname(f.relativePath);
            if (ext && ext.toLowerCase() === ".svg") {
                svgFiles.push(f);
            }
        }
    });
    return svgFiles;
}

function walkTree(root, callback, topRoot = root) {
    let items = [];
    try {
        items = readdirSync(root);
    } catch (e) {
        //忽略读取失败的目录
    }
    for (const item of items) {
        let itemPath = join(root, item);
        let stats = null;
        try {
            stats = statSync(itemPath);
        } catch (e) {
            //忽略读取失败的文件
        }
        if (stats) {
            callback({
                absolutePath: normalizePath(itemPath),
                relativePath: normalizePath(relative(topRoot, itemPath)),
                isDirectory: stats.isDirectory(),
            });
            if (stats.isDirectory()) {
                walkTree(itemPath, callback, topRoot);
            }
        }
    }
}

export {scxIconPluginUseHtml, scxIconPluginUseJS};
