const template = `
<style>
.lw0 {
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    padding-bottom: 20vh;
    box-sizing: border-box;
}

.llw1 {
    height: 220px;
    width: 220px;
}

.lcw2 {
    margin-top: 25px;
    height: 60px;
    width: 60px;
}

.lc3 > :last-child {
    transform-origin: 50% 50%;
    animation: la0 1400ms ease-in-out infinite, ra1 1400ms linear infinite;
}

@keyframes la0 {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0
    }
    50% {
        stroke-dasharray: 100, 200;
        stroke-dashoffset: -15px
    }
    100% {
        stroke-dasharray: 100, 200;
        stroke-dashoffset: -125px
    }
}

@keyframes ra1 {
    100% {
        transform: rotate(360deg)
    }
}
</style>

<div class="lw0">
    <div class="llw1">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <polygon fill="#489349" points="717,0 167,552 656,552 307,1024 857,472 368,472"/>
        </svg>
    </div>
    <div class="lcw2">
        <svg class="lc3" fill="transparent" stroke-linecap="round" stroke-width="4" viewbox="0 0 44 44">
            <circle cx="22" cy="22" r="20" stroke="#caddc7"></circle>
            <circle cx="22" cy="22" r="20" stroke="#489349" stroke-dasharray="80,200"></circle>
        </svg>
    </div>
</div>
`;

/**
 * 初始化 scxLoading 元素
 * @returns {DocumentFragment}
 */
function initScxLoading() {
    //采用 template 而不是直接 innerHtml 是为了保证样式隔离
    const scxLoadingTemplate = document.createElement("template");
    scxLoadingTemplate.innerHTML = template;
    return scxLoadingTemplate.content;
}

/**
 * scxLoading 全局变量 创建全部使用此变量
 * @type {DocumentFragment}
 */
const scxLoading = initScxLoading();

/**
 * scxLoading 组件类
 */
class ScxLoading extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "closed"});
        shadow.appendChild(scxLoading.cloneNode(true));
    }
}

/**
 * 注册 scxLoading 组件
 */
customElements.define("scx-loading", ScxLoading);
