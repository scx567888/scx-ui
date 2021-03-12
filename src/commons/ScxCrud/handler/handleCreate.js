


//点击添加页面
function handleCreate(flag) {
    //设置添加确认按钮loading 为false 表示可以点击
    crudContext.editDialog.confirmButtonLoading = false;
    //设置当前页面的 flag 是 create 还是 update
    crudContext.pageFlag = flag;
    //清洗临时数据
    resetTemp();
    //准备添加页面的下拉选 自动完成框等数据并添加校验规则
    preparationDataAndAddingRules();
    //弹出页面
    crudContext.editDialog.visible = true;
}