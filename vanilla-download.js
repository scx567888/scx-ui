import {isString} from "./vanilla-type-helper.js";
import {notNull} from "./vanilla-object-helper.js";

/**
 * 根据 url 下载文件
 * @param url {string|Blob} 下载地址
 * @param fileName 下载文件的名称 为空取文件原始名
 */
function download(url, fileName = null) {
    const link = document.createElement('a');
    link.rel = 'noopener';
    link.target = '_blank'

    link.download = notNull(fileName) ? fileName : '';

    if (isString(url)) { // 标准 URL
        link.href = url
        if (link.origin !== location.origin) {
            fetch(link.href, {method: "GET"}).then(r => {
                if (r.ok) {
                    return r.blob();
                } else {
                    throw new Error(r.status + " : " + r.statusText);
                }
            }).then(b => download(b, fileName)).catch(e => {
                console.error(e);
                link.click();
            });
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