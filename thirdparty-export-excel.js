import {utils, write} from 'xlsx'
import {download} from "./vanilla-download.js";

//此方法其实是从 xlsx 中拷贝出来的
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf;
}

/**
 * 导出 excel
 * @param headerTranslationMap 表头的翻译
 * @param listData 数组类型数据
 * @param filename 文件名称 (注意不需要写后缀)
 * @param bookType 导出类型 默认 xlsx
 */
function exportExcel({headerTranslationMap, listData, filename = "Exported-Excel", bookType = "xlsx"}) {

    //没有 headerTranslationMap 则尝试已第一列的 key 作为 headerTranslationMap
    if (!headerTranslationMap) {
        headerTranslationMap = {};
        if (listData.length > 0) {
            for (let listDatumKey in listData[0]) {
                headerTranslationMap[listDatumKey] = listDatumKey;
            }
        }
    }

    // 内部使用的 listData
    const _listData = [...listData];

    //添加表头
    _listData.unshift(headerTranslationMap);

    //二维数组 用于导出
    const twoDimensionalArray = [];

    //循环向 twoDimensionalArray 中写入数组
    for (let listElement of _listData) {
        const tempArray = [];
        for (let headTranslationKey in headerTranslationMap) {
            tempArray.push(listElement[headTranslationKey])
        }
        twoDimensionalArray.push(tempArray)
    }

    //创建 工作簿 (workbook)
    const workbook = {
        SheetNames: ['Sheet1'], Sheets: {
            Sheet1: utils.aoa_to_sheet(twoDimensionalArray)
        }
    };

    // 获取可写入对象
    const wb = write(workbook, {
        bookType: bookType, bookSST: false, type: 'binary'
    });

    //创建 blob 对象
    const url = window.URL.createObjectURL(new Blob([s2ab(wb)], {type: "application/octet-stream"}));

    //下载
    download(url, `${filename}.${bookType}`);

}

export {exportExcel}
