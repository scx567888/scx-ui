import {utils, write} from 'xlsx'
import {download} from "../vanilla/download.js";
import {notNull} from "../vanilla/object-helper.js";

/**
 * 导出 excel
 * @param data 数据
 * @param header 表头的翻译
 * @param fileName {string}
 */
function exportExcel(fileName, data, header = null) {
    const excelBlob = createExcel(data, header);
    if (!fileName.endsWith(".xlsx")) {
        fileName = fileName + ".xlsx";
    }
    download(excelBlob, fileName);
}

//没有 header 则尝试已第一列的 key 作为 header
function tryCreateHeader(data) {
    const header = {};
    const firstData = data[0];
    if (notNull(firstData)) {
        Object.keys(firstData).forEach((k) => header[k] = k);
    }
    return header;
}

/**
 * 导出 excel
 * @param header 表头的翻译 应该是一个 对象
 * @param data 数组类型数据
 * @return {Blob}
 */
function createExcel(data, header = tryCreateHeader(data)) {

    const headerKeys = Object.keys(header);

    const arrayData = [header, ...data].map(b => headerKeys.map(k => b[k])); //二维数组 参照 https://docs.sheetjs.com/docs/api/utilities

    const sheet1 = utils.aoa_to_sheet(arrayData);

    const workbook = {SheetNames: ['Sheet1'], Sheets: {Sheet1: sheet1}};

    const buffer = write(workbook, {type: 'buffer'});

    return new Blob([buffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

}

export {createExcel, exportExcel}
