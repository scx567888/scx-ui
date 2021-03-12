//绑定键盘事件
export function bindingKeyboard(e,crudConfig) {
    if (crudConfig.hasShortcutKeys) {
        //按键盘方向左键
        if (e.key === 'ArrowLeft' && !crudContext.loading) {
            //如果页面没有加载完 禁止下一页 防止向服务器发送过多请求
            previousPage();
        }
        //按键盘方向右键
        if (e.key === 'ArrowRight' && !crudContext.loading) {
            nextPage();
        }
        //按键盘 delete 并且 批量删除框没有在页面中显示
        if (e.key === 'Delete' && !crudContext.deleteDialog.visible) {
            deleteByKeyBoard();
        }
        //按键盘 回车 目前用来实现 批量删除框的确认 (要求 批量删除框必须已经显示在页面中 并且要删除数据 不能为空)
        if (e.key === 'Enter' && crudContext.deleteDialog.visible && crudContext.deleteDialog.tableBody.length !== 0) {
            batchDeleteModel(true)
        }
        //按键盘 组合按键 alt + 'A'或'a' 目前用来实现当前页面 全选 (目前仅用于 批量删除)
        if (e.altKey && (e.key === 'a' || e.key === 'A')) {
            scxTableRef.value.selectAll()
        }
    }
}