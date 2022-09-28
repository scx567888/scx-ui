import {isString} from "./vanilla-type-helper.js";

/**
 * 根据 url 下载文件
 * @param url {string|Blob} 下载地址
 * @param fileName 下载文件的名称 为空取文件原始名
 */
function download(url, fileName) {
    const link = document.createElement('a');
    link.style.display = 'none';
    if (isString(url)) {
        link.href = url;
    } else if (url instanceof Blob) {
        link.href = URL.createObjectURL(url);
    }
    if (fileName) {
        link.setAttribute('download', fileName);
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export {
    download
}