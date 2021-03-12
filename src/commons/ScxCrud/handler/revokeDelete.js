//恢复删除 功能
import request from "../../../../utils/request";
import {ElNotification} from "element-plus";
import {t} from "../../../../i18n";

function revokeDelete(data, _notify) {
    //调用恢复删除 api
    request.get(crudConfig.revokeDeleteApi + data.id).then(req => {
        //如果 恢复删除成功
        if (req.message === 'success') {
            //将恢复删除的 数据插入 页面中
            crudContext.tableBody.unshift(req.items);
            //关闭 恢复删除的框框
            _notify.close();
            //页面条数 加一
            crudContext.total = crudContext.total + 1;
        } else {
            ElNotification({
                title: t("table.revokeDeleteError"),
                type: 'error',
                duration: 4000
            });
        }
    })
}