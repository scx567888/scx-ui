//查询列表方法

export function getList(crudContext) {
    //开启表格加载动画
    crudContext.tableLoading = true;
    //获取实际能够查询的最大页数
    const maxPageSize = Math.ceil(crudContext.total / crudContext.queryParam.limit);
    //如果查询的页数 大于 实际能够查询的最大页数
    if (crudContext.queryParam.page > maxPageSize) {
        //使页数变为 最大能够查询的页数  也就是最后一页
        crudContext.queryParam.page = maxPageSize;
        //如果页码小于1
        if (crudContext.queryParam.page < 1) {
            //查询第一页
            crudContext.queryParam.page = 1;
            //获取查询的api 传入查询的参数 此处进行参数过滤
        }
        //此处进行关闭
        crudContext.tableLoading = false
    } else {
        if (crudContext.queryParam.page < 1) {
            crudContext.queryParam.page = 1
        }
    }
    let queryParamCopy = JSON.parse(JSON.stringify(crudContext.queryParam));
    for (let key in props.scxCrudItems) {
        if (props.scxCrudItems[key].isFilter && props.scxCrudItems[key].type === 'select' && props.scxCrudItems[key].buildUrl) {
            try {
                let optionArrayName = crudContext.optionArray[props.scxCrudItems[key].prop];
                let optionArrayValue = optionArrayName.find(d => d[props.scxCrudItems[key].labelProp] === queryParamCopy.queryObject[props.scxCrudItems[key].prop]);
                queryParamCopy.queryObject[props.scxCrudItems[key].prop] = optionArrayValue[props.scxCrudItems[key].valueProp];
            } catch (e) {

            }
        }
    }
    queryParamCopy.queryObject = filterParams(queryParamCopy.queryObject);
    if (!crudConfig.hasPagination) {
        queryParamCopy.limit = -1
    }
    request.post(crudConfig.listApi, queryParamCopy).then(response => {
        crudContext.tableBody = response.items;
        crudContext.total = response.total;
        crudContext.tableLoading = false
    });

}