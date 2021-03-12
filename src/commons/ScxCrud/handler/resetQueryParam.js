//初始化全部查询参数
function resetQueryParam() {
    //循环所有列
    for (let key in props.scxCrudItems) {
        //如果是查询参数
        if (props.scxCrudItems[key].isFilter) {
            //将 queryParam 里对应的参数设为 null
            crudContext.queryParam.queryObject[props.scxCrudItems[key].prop] = ''
        }
    }
    //进行一次查询
    getList();
}