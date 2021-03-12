//点击查询按钮
function handleFilter() {
    //使当前页数为1
    crudContext.queryParam.page = 1;
    //查询列表
    getList()
}