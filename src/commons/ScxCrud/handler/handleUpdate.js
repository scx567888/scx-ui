


//点击修改
function handleUpdate(row, flag) {
    crudContext.editDialog.confirmButtonLoading = false;
    crudContext.pageFlag = flag;
    Object.assign(crudContext.temp, row);
    preparationDataAndAddingRules();
    //显示页面
    crudContext.editDialog.visible = true;
}