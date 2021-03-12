import {arrayToStr} from "../../../../utils";

//将 Model 中的所有 数组属性 转换为以 ',' 分割的字符串 方便后台存储
export function filterModel(obj) {
    let _newPar = {};
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        if (Array.isArray(obj[key])) {
            //如果是一个数组对象那么就不进行转义
            if (Object.prototype.toString.call(obj[key][0]) === '[object Object]') {
                _newPar[key] = obj[key];
            } else {
                _newPar[key] = arrayToStr(obj[key])
            }
        } else {
            _newPar[key] = obj[key];
        }
    }
    //返回对象
    return _newPar;
}