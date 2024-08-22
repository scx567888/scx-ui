const SCX_LOADING_HTML = `
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        .lw0 {
            width: 100%;
            height: 100%;
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
                <polygon fill="url(#myGradient)" points="717,0 195,552 636,552 307,1024 829,472 388,472"/>
                <defs>
                    <linearGradient id="myGradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stop-color="#489349"/>
                        <stop offset="100%" stop-color="#70960c"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <div class="lcw2">
            <svg class="lc3" fill="transparent" stroke-linecap="round" stroke-width="4" viewbox="0 0 44 44">
                <circle cx="22" cy="22" r="20" stroke="rgba(92,148,43,0.3)"></circle>
                <circle cx="22" cy="22" r="20" stroke="rgba(92,148,43,1)" stroke-dasharray="80,200"></circle>
            </svg>
        </div>
    </div>
`;

function scxLoadingPlugin(loadingHtml = SCX_LOADING_HTML) {

    return {

        transformIndexHtml(html) {
            console.log("ScxLoading 处理完成 !!!");
            return html.replace(`<div id="app">`, `<div id="app">` + loadingHtml);
        },

    };

}

export {
    scxLoadingPlugin,
};
