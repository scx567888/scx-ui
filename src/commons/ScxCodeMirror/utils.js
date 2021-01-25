function getCodeType(codeType) {
    if (codeType === 'js') {
        return `text/javascript`
    } else if (codeType === 'css') {
        return `text/css`
    } else if (codeType === 'html') {
        //html 使用混合模式
        return {
            name: "htmlmixed",
            scriptTypes: [{
                matches: /\/x-handlebars-template|\/x-mustache/i,
                mode: null
            },
                {
                    matches: /(text|application)\/(x-)?vb(a|script)/i,
                    mode: "vbscript"
                }]
        };
    } else {
        return `text/javascript`
    }
}

export {getCodeType}