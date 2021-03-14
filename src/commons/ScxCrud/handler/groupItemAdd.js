
//多重组添加方法
export function groupItemAdd(col) {
    let groupItemTemp = {}
    let groupItemIndex = 0;
    if (crudContext.temp[col.prop]) {
        groupItemIndex = crudContext.temp[col.prop].length;
    } else {
        crudContext.temp[col.prop] = [];
    }
    for (let key in col.groupItem) {
        let tableEntity = col.groupItem[key];
        //对校验规则进行设置
        if (tableEntity.rules) {
            crudContext.rules[col.prop + '.' + groupItemIndex + '.' + tableEntity.prop] = [formatRules(tableEntity)]
        }
        groupItemTemp[col.groupItem[key].prop] = '';
    }
    crudContext.temp[col.prop].push(groupItemTemp);
}
