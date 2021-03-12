//点击table 表头进行排序
function sortByProp(column) {
    crudContext.queryParam.orderBy.orderByColumn = column.prop
    crudContext.queryParam.orderBy.sortType = column.sortType
    getList();
}