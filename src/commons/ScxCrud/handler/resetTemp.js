//清空 temp 中的所有属性值
function resetTemp(crudContext,props) {
    crudContext.temp = {};
    for (let key in props.scxCrudItems) {
        let dataEntity = props.scxCrudItems[key];
        //向 temp(临时操作对象) 里添加所有的元素的属性 并设置值为 空字符串
        if (dataEntity.type === 'group' || dataEntity.type === 'checkbox') {
            crudContext.temp[dataEntity.prop] = [];
        } else {
            //如果有默认值在此设置
            crudContext.temp[dataEntity.prop] = dataEntity.defaultValue ? dataEntity.defaultValue : '';
        }
    }
}