<p align="center">
    <img src="https://scx.cool/logos/scx-ui-logo.svg" width="300px"  alt="scx-ui-logo"/>
</p>
<p align="center">
    <a target="_blank" href="https://github.com/scx567888/scx-ui/actions/workflows/ci.yml">
        <img src="https://github.com/scx567888/scx-ui/actions/workflows/ci.yml/badge.svg" alt="CI"/>
    </a>
    <a target="_blank" href="https://www.npmjs.com/package/scx-ui">
        <img src="https://img.shields.io/npm/v/scx-ui.svg?color=ff69b4" alt="npm package"/>
    </a>
    <a target="_blank" href="https://github.com/scx567888/scx-ui">
        <img src="https://img.shields.io/github/languages/code-size/scx567888/scx-ui?color=orange" alt="code-size"/>
    </a>
    <a target="_blank" href="https://github.com/scx567888/scx-ui/issues">
        <img src="https://img.shields.io/github/issues/scx567888/scx-ui" alt="issues"/>
    </a> 
    <a target="_blank" href="https://github.com/scx567888/scx-ui/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/scx567888/scx-ui" alt="license"/>
    </a>
</p>
<p align="center">
   <a target="_blank" href="https://github.com/vitejs/vite">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/dev/vite?color=f44336" alt="Vite"/>
    </a>
    <a target="_blank" href="https://github.com/cheeriojs/dom-serializer">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/dom-serializer?color=ff8000" alt="dom-serializer"/>
    </a>
    <a target="_blank" href="https://github.com/fb55/htmlparser2">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/htmlparser2?color=44be16" alt="htmlparser2"/>
    </a>
    <a target="_blank" href="https://github.com/vuejs/core">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/vue?color=29aaf5" alt="vue"/>
    </a> 
    <a target="_blank" href="https://github.com/zenorocha/clipboard.js">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/dev/clipboard?color=9c27b0" alt="clipboard.js"/>
    </a>
</p>

简体中文 | [English](./README.md)

> 用于 SCX 的一些前端 UI 套件

## NPM

```
npm install scx-ui
```

## 快速开始

#### 1. 安装用于 ScxIcon 图标的 vite 插件 。

```javascript
import {scxIconPluginUseJS} from 'scx-ui/vite-plugin/index.js';

export default {
    base: './',
    plugins: [scxIconPluginUseJS( // 或 scxIconPluginUseHtml
        'your-svg-root' //您自己的svg图标文件夹 , 也可以是一个数组 []
    )]
}
```

#### 2. 安装 ScxIcon 图标组件 。

```javascript
import {createApp} from 'vue';
import {ScxComponent} from 'scx-ui';
import App from './App.vue';
import 'scx-ui/style/default.css'; // 别忘了导入主题
import 'scx-ui/style/dark.css';
import 'scx-icon/register'; //如果 type = js 则需要再次引入虚拟模块

createApp(App)
    .use(ScxComponent)
    .mount('#app');
```

#### 3. 使用 ScxIcon 图标组件 。

```html
<!-- 你会看见一个笑脸图标 -->
<scx-icon icon="outlined-face-smile"/>
```

有关更多信息，请参阅 [文档](https://scx.cool/docs/scx/index.html)

## Stats

![Alt](https://repobeats.axiom.co/api/embed/e6bbe7c4f1f5ca53b3d47becda0e735766bef33a.svg "Repobeats analytics image")
