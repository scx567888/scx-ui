
//批量删除 主方法
import {ElNotification} from "element-plus";
import {t} from "../../../../i18n";
import request from "../../../../utils/request";
import {h} from "vue";

function batchDeleteModel(fromKeyBorder) {
    //要删除的 对象的 id 数组
    let deleteIds = [];
    //向后台发送 请求的 对象
    let tempData = {'deleteIds': deleteIds};
    //如果不是 通过 键盘删除的 实际 this.deleteObjectArray 中并没有数据 所以在此获取一下 要删除的数据
    if (!fromKeyBorder) {
        crudContext.deleteDialog.tableBody = scxTableRef.value.getSelection()
    }
    deleteIds = crudContext.deleteDialog.tableBody.map(d => d.id);
    //如果 数据为空 显示提示框
    if (deleteIds.length === 0) {
        crudContext.deleteDialog.batchDeleteButtonVisible = false;
        ElNotification({
            title: t('table.noDataSelected'),
            type: 'warning',
            duration: 4000
        });
    } else {
        //数据校验全部没问题 可以进行 批量删除
        request.delete(crudConfig.batchDeleteApi, tempData).then(response => {
            if (response.message === 'success') {
                crudContext.deleteDialog.batchDeleteButtonVisible = false;
                //清空多选数据存储对象
                //关闭删除 dialog
                crudContext.deleteDialog.visible = false;
                //清空多选数据
                scxTableRef.value.clearSelection();

                if (deleteIds.length === 1) {
                    ElNotification({
                        title: '删除成功',
                        message: h('div', {style: 'width:240px'}, h('p', {}, '已成功删除 :' + crudContext.deleteDialog.tableBody[0][crudConfig.editShow])),
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        duration: 4000
                    });

                    const index = crudContext.tableBody.indexOf(crudContext.deleteDialog.tableBody[0]);
                    crudContext.tableBody.splice(index, 1);
                    crudContext.total = crudContext.total - 1;

                } else {
                    ElNotification({
                        title: '已删除全部选中数据 , 共' + response.deletedCount + '条 !',
                        type: 'success',
                        duration: 4000
                    });
                    //todo 因为删除项过多可能造成页数改变
                    //此处暂时不考虑多人同时删除的情况
                    //如果删除的条数 大于或等于 当前页面显示的条数 说明当前页面已经被删没了
                    //但是无法判断到底删除了几页  !!!其实此处可以通过一些复杂的方法 判断 待定
                    //所以此处将页数重置为 0 获取第一页
                    if (response.deletedCount >= crudContext.tableBody.length) {
                        crudContext.queryParam.page = 0;
                    }
                    getList();
                }
                crudContext.deleteDialog.tableBody = [];
            } else {
                ElNotification({
                    title: '批量删除失败 !!!',
                    type: 'error',
                    duration: 4000
                });
            }
        })
    }
}