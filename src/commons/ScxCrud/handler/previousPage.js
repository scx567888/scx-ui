//上一页
function previousPage() {
    //页面减 1
    crudContext.queryParam.page += -1;
    //如果小于 1 证明当前页面是 第一页 不做查询操作 用于减少后台并发量
    if (crudContext.queryParam.page < 1) {
        crudContext.queryParam.page = 1
    } else {
        //否则执行查询方法
        getList()
    }
}