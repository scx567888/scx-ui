import scxConfig from '../../scx.config'
import {t} from '/@/i18n'

/**
 *翻译 顶部的 title
 * @param key
 */
const getPageTitle = (key) => t(`route.${key}`) ? t(`route.${key}`) + '-' + `${scxConfig.title}` : `${scxConfig.title}`;
/**
 * 是否是外链
 * @param {string} path
 * @returns {boolean}
 */
const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path);

/**
 * 格式化显示文件大小
 * @param value
 * @returns {string}
 */
function formatFileSize(value) {
    if (null == value || value === '') {
        return "0 Bytes";
    }
    const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index;
    const srcSize = parseFloat(value);
    index = Math.floor(Math.log(srcSize) / Math.log(1024));
    let size = srcSize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
}


/**
 * 将含有 id parentId 的 list 列表转换为树形结构
 */
function list2tree(source) {
    if (source.length === 0) {
        return []
    } else {
        let cloneData = JSON.parse(JSON.stringify(source))      // 对源数据深度克隆
        return cloneData.filter(father => {                      // 循环所有项，并添加children属性
            let branchArr = cloneData.filter(child => father.id === child.parentId);   // 返回每一项的子级数组
            branchArr.length > 0 ? father.children = branchArr : ''   //给父级添加一个children属性，并赋值
            return Number(father.parentId) === 0;      //返回第一层
        });
    }
}

/**
 * 根据路径获取文件名
 * @param filePath
 * @returns {*}
 */
function getFileNameByPath(filePath) {
    const filePathSplit = filePath.split('/');
    const fileName = filePathSplit[filePathSplit.length - 1];
    return fileName.split('.')[0];
}

//判断字符串 不为空
const strIsNotBlank = (str) => (str !== undefined && str !== null) ? str.toString().trim() !== '' : false;
//数字转字符串
const arrayToStr = (arr) => arr == null || arr.length === 0 ? '' : arr.join(',');


function getNowTimeStr() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return year + '年' + month + '月' + day + '日 ' + hour + '时' + minute + '分' + second + '秒';
}

// 把 字符串 按照 ',' 分割 (注意 建议所有的 数组向后台传递时 都用 ',' 拼接为字符串)
function strToArray(str) {
    if (str == null) {
        return []
    }
    if (Array.isArray(str)) {
        return str
    }
    return str.split(',').map(s => !isNaN(s) ? Number(s) : s)
}

function resolvePath(a, b) {
    return '/' + a.split('/').concat(b.split('/')).filter(s => s !== '').join('/');
}

function download(url, fileName) {
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    fileName && link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getUUID() {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
}

function getI18nModule(allModules) {
    const modules = {}
    for (const path in allModules) {
        let fileNameByPath = getFileNameByPath(path);
        modules[fileNameByPath] = allModules[path].default
    }
    return modules;
}

export {
    strToArray,
    getNowTimeStr,
    arrayToStr,
    strIsNotBlank,
    getPageTitle,
    isExternal,
    formatFileSize,
    list2tree,
    getFileNameByPath,
    resolvePath,
    download,
    getUUID,
    getI18nModule
}