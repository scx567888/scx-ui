//过滤  Switch
//把 类型为 Switch 的 由 bool 值转换为 文字
import {t} from "../../i18n";
import {h} from "vue";
import scxConfig from "../../../scx.config";
import {arrayToStr, strToArray} from "../../utils";
import {getRegionTextDataByCode} from "../../utils/constant/region";
import {ElImage} from "element-plus";

function filterSwitch(value) {
    try {
        return value ? t('table.yes') : t('table.no')
    } catch (e) {
        return t('table.unknown')
    }
}

function filterSwitchRender(value) {
    const style = value ? {'style': 'color: #13ce66'} : {'style': 'color: #ff4949'};
    return h('span', style, filterSwitch(value))
}

const getPicture = (pictureIds) => pictureIds ? scxConfig.baseApi + '/base/showPictureById/' + strToArray(pictureIds)[0] + '?w=200&h=200' : null;
const getPictureList = (pictureIds) => pictureIds ? strToArray(pictureIds).map(id => scxConfig.baseApi + '/base/showPictureById/' + id) : [];

//用于 table 列 为下拉选的过滤
function filterSelect(col, value, optionArray) {
    try {
        let optionArrayValue = optionArray.find(d => d[col.valueProp] == value);
        if (col.tableLabelFormat) {
            return col.tableLabelFormat(optionArrayValue)
        }
        return optionArrayValue[col.labelProp];
    } catch (e) {
        return t('table.unknown')
    }
}

function filterCheckbox(col, value, optionArray) {
    try {
        if (col.tableLabelFormat) {
            return col.tableLabelFormat(value, optionArray)
        }
        return arrayToStr(strToArray(value).map((item) => optionArray.find(d => d[col.valueProp] === item)[col.labelProp]));

    } catch (e) {
        return t('table.unknown')
    }
}

const filterCheckboxRender = (col, value, optionArray) => h('span', {}, filterCheckbox(col, value, optionArray));

const filterSelectRender = (col, value, optionArray) => h('span', {}, filterSelect(col, value, optionArray));

const filterRegion = (value) => getRegionTextDataByCode(value);

const filterRegionRender = (value) => h('span', {}, getRegionTextDataByCode(value));

const filterUploadRender = (value) => h(ElImage, {
    style: 'width: 100px; height: 100px',
    src: getPicture(value),
    previewSrcList: getPictureList(value)
});
const filterLinkRender = (value) => {
    const href = value && (value.startsWith('http://') || (value.startsWith('https://')));
    return h('a', {class: 'tableColumnLink', target: '_blank', href: href ? value : 'http://' + value}, value);
}

export {
    filterSwitch,
    filterSwitchRender,
    filterSelect,
    filterSelectRender,
    filterCheckboxRender,
    filterCheckbox,
    filterRegion,
    filterRegionRender,
    filterUploadRender,
    filterLinkRender
}