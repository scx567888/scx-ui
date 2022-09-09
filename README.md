<p align="center">
    <img src="https://scx.cool/img/scx-ui-logo.svg" width="300px"  alt="scx-ui-logo"/>
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
    <a target="_blank" href="https://github.com/satazor/js-spark-md5">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/spark-md5?color=ff8000" alt="js-spark-md5"/>
    </a>
    <a target="_blank" href="https://github.com/JetBrains/svg-mixer">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/svg-mixer?color=44be16" alt="svg-mixer"/>
    </a>
    <a target="_blank" href="https://github.com/vuejs/core">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/vue?color=29aaf5" alt="vue"/>
    </a> 
    <a target="_blank" href="https://github.com/SheetJS/sheetjs">
        <img src="https://img.shields.io/github/package-json/dependency-version/scx567888/scx-ui/xlsx?color=9c27b0" alt="SheetJS"/>
    </a>
</p>

English | [简体中文](./README.zh-CN.md)

> Some front end kits for SCX

## NPM

```
npm install scx-ui
```

## Quick start

#### 1. Install the vite plugin for ScxIcon .

```javascript
import {scxIconPlugin} from 'scx-ui/scx-icon-vite-plugins.js';

export default {
    base: './',
    plugins: [scxIconPlugin({
        //Icon inject type, js (use js) or html (inject to the index.html)
        type: 'js',
        //your svg icon root, It can also be an array []
        svgRoot: 'your-svg-root',
    })]
}
```

#### 2. Install vue component for ScxIcon .

```javascript
import {createApp} from 'vue';
import {ScxComponent} from 'scx-ui/scx-component.js';
import App from './App.vue';
import 'scx-ui/_scx-theme/default.css'; // Don't forget to import theme
import 'scx-ui/_scx-theme/dark.css';
import 'scx-icon/register'; //if type = js you need import this virtual module

createApp(App)
    .use(ScxComponent)
    .mount('#app');
```

#### 3. Use ScxIcon component .

```html
<!-- You will see a smile face icon -->
<scx-icon icon="outlined-face-smile"/>
```

For more information, see [docs](https://scx.cool/docs/scx/index.html)

## Stats

![Alt](https://repobeats.axiom.co/api/embed/b93bc73fe16c448b42c101016406e859bd522872.svg "Repobeats analytics image")