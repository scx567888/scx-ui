//点击删除
import {state} from "../../../../store";
import request from "../../../../utils/request";
import {ElNotification} from "element-plus";
import {h} from "vue";

function handleDelete(row) {
    //获取删除 选项是为物理删除还是逻辑删除 (此项由后端决定)
    if (state.user.realDelete) {
        crudContext.deleteDialog.tableBody = Array.isArray(row) ? row : [row]
        if (crudContext.deleteDialog.tableBody.length === 0) {
            crudContext.deleteDialog.batchDeleteButtonVisible = false
        } else {
            crudContext.deleteDialog.visible = true
        }
    } else {
        //因为需要在 通知消息里 创建 按钮 此处进行构建
        request.delete(crudConfig.deleteApi + row.id, {}).then(data => {
            //删除方式可能有两种 一个是标记删除  一个是物理删除
            // 删除方式在后台 配置 因为 标记删除可以回复 所以在此处进行判断
            // isRealDelete 说明删除成功 并且 删除方式为 标记删除
            if (data.message === 'success') {
                const _notify = ElNotification({
                    title: '删除成功',
                    message: h('div', {style: 'width:240px'}, [
                        h('p', {}, '已成功删除 :' + row[crudConfig.editShow]),
                        h('el-button', {
                            style: 'margin-left:20px;float:right',
                            size: 'mini',
                            type: 'success',
                            icon: 'el-icon-back',
                            onClick: () => revokeDelete(row, _notify)
                        }, '点击恢复')
                    ]),
                    type: 'success',
                    dangerouslyUseHTMLString: true,
                    duration: 4000
                });
                //此处将 删除的数据 从列表中移除
                const index = crudContext.tableBody.indexOf(row);
                crudContext.tableBody.splice(index, 1);
                //总条数 减少 一个
                crudContext.total = crudContext.total - 1;
            } else {
                //删除失败
                ElNotification({
                    title: '删除失败',
                    message: h('a', {
                        onClick: () => {
                            console.log(row.id)
                        }
                    }, '恢复数据'),
                    type: 'error',
                    dangerouslyUseHTMLString: true,
                    duration: 4000
                });
            }
        })
    }
}