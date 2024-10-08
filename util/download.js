import {isString} from "./type-helper.js";
import {isNull, notBlank, notNull} from "./object-helper.js";

function getFileNameFromContentDisposition(str) {
    if (!str) {
        return null;
    }
    const s = str.split(/;\s*/);
    //优先使用 filename* 请查看 : https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition
    let fileNameElement = s.filter(c => c.startsWith("filename*="))[0];
    if (!fileNameElement) {
        fileNameElement = s.filter(c => c.startsWith("filename="))[0];
    }
    if (!fileNameElement) {// 两者都没有
        return null;
    }
    const fileNameWithCharset = fileNameElement.split("=")[1];
    const fs = fileNameWithCharset.split("''");
    //这里还可以获取到 charset 但是用不到 所以就管了
    const encodedFileName = fs[fs.length - 1];
    return notBlank(encodedFileName) ? decodeURIComponent(encodedFileName) : null;
}

/**
 * 根据 url 下载文件
 * @param url {string|Blob} 下载地址
 * @param fileName 下载文件的名称 为空取文件原始名
 */
function download(url, fileName = null) {
    const link = document.createElement("a");
    link.rel = "noopener";
    link.target = "_blank";

    link.download = notNull(fileName) ? fileName : "";

    if (isString(url) || url instanceof URL) { // 标准 URL
        link.href = url;
        if (link.origin !== location.origin) {
            fetch(link.href, {method: "GET"}).then(r => {
                if (r.ok) {
                    if (isNull(fileName)) { //如果原有的下载名称为空 我们尝试使用 content-disposition 中的文件名
                        const f = getFileNameFromContentDisposition(r.headers.get("content-disposition"));
                        if (notNull(f)) {
                            fileName = f;
                        }
                    }
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
    download,
    getFileNameFromContentDisposition,
};
