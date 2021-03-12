//根据 键盘delete 删除
function deleteByKeyBoard() {
    if (crudConfig.hasBatchDelete) {
        crudContext.deleteDialog.tableBody = scxTableRef.value.getSelection();
        if (crudContext.deleteDialog.tableBody.length === 0) {
            crudContext.deleteDialog.batchDeleteButtonVisible = false
        } else {
            crudContext.deleteDialog.visible = true
        }
    }
}