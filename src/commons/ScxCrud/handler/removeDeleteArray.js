//移除 批量删除的对象 用于批量删除弹出框
function removeDeleteArray(row) {
    const index = crudContext.deleteDialog.tableBody.indexOf(row);
    crudContext.deleteDialog.tableBody.splice(index, 1);
}