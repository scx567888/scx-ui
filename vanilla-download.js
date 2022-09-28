import {isString} from "./vanilla-type-helper.js";

/**
 * 根据 url 下载文件
 * @param url {string|Blob} 下载地址
 * @param fileName 下载文件的名称 为空取文件原始名
 */
function download(url, fileName) {
    const link = document.createElement('a');
    link.rel = 'noopener';
    link.target = '_blank'

    if (fileName) {
        link.download = fileName;
    }

    if (isString(url)) { // 标准 URL
        link.href = url
        if (link.origin !== location.origin) {
            fetch(link.href, {method: "GET"}).then(r => r.blob()).then(b => download(b, name)).catch(e => link.click());
        } else {
            link.click();
        }
    } else { // Blob 文件
        link.href = URL.createObjectURL(url);
        setTimeout(() => URL.revokeObjectURL(link.href), 4E4); // 40s
        setTimeout(() => link.click(), 0);
    }
}

export {
    download
}