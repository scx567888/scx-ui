import REGION_DATA from './regionData'
import {strToArray} from "../../index";


const getRegionData = () => REGION_DATA;


function getRegionTextDataByCode(code) {
    let codeText = '未知';
    code = strToArray(code)
    const r1 = REGION_DATA.filter(c1 => c1.value === code[0])[0];
    if (r1) {
        codeText = r1.label
        const r2 = r1.children.filter(c2 => c2.value === code[1])[0];
        if (r2) {
            codeText = codeText + ',' + r2.label
            const r3 = r2.children.filter(c3 => c3.value === code[2])[0];
            if (r3) {
                codeText = codeText + ',' + r3.label
            }
        }
    }
    return codeText
}

export {
    getRegionData,
    getRegionTextDataByCode
}