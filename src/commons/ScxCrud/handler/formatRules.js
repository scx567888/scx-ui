import {t} from "../../../../i18n";

function formatRules(modelName, routerCol) {
    let tempRules = {};
    // 校验的 flag 比如密码 在创建的时候需要校验
    // 但是修改的时候就不需要校验 就设置为 checkFlag:['create'] 即可
    const checkFlag = routerCol.rules.checkFlag;
    if (!checkFlag || checkFlag.includes(crudContext.pageFlag)) {
        const colName = (routerCol.label || t(modelName + '.' + routerCol.prop));
        tempRules.trigger = routerCol.rules.trigger || 'blur';
        if (routerCol.rules.validator) {
            tempRules.validator = routerCol.rules.validator;
            tempRules.required = true
        } else if (routerCol.rules.isUnique) {
            tempRules.validator = (a, b, c) => checkUnique(a, b, c, colName)
            tempRules.required = true
            tempRules.trigger = 'blur';
        } else {
            tempRules.message = colName + '不能为空';
            tempRules.required = routerCol.rules.required === undefined || routerCol.rules.required;
        }
    }
    return tempRules;
}