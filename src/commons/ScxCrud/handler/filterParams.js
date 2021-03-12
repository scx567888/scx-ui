import {arrayToStr, strIsNotBlank} from "../../../../utils";

function filterParams(obj) {
    let _newPar = {};
    //进行循环对象所有属性
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        //如果对象属性的值不为空，就保存该属性（如果属性的值全部是空格，属于为空。）
        if (strIsNotBlank(obj[key])) {
            //将不为空的属性放入新对象
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
    }
    //返回过滤后的查询对象
    return _newPar;
}