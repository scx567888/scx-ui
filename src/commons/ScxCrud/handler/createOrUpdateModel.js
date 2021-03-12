
//添加一个 model 到后台
import request from "../../../../utils/request";
import {ElNotification} from "element-plus";
import {nextTick} from "vue";

function createOrUpdateModel() {
    crudContext.editDialog.confirmButtonLoading = true;
    //数据校验
    scxCreateAndUpdateFormRef.value.validate((valid) => {
        //如果所有数据都没有问题
        if (valid) {

            //此处进行拷贝 防止table 中的数据和 temp 产生影响
            let tempData = Object.assign({}, crudContext.temp);
            // crudContext 支持自定义 过滤临时对象的方法 在prop 中设置 customizeTemp 即可
            if (crudConfig.customizeTemp !== null) {
                let ct = crudConfig.customizeTemp(tempData);
                if (ct === -1) {
                    crudContext.editDialog.confirmButtonLoading = false;
                    return false
                } else {
                    tempData = ct;
                }
            }
            //此处设置 id 为空 因为后台使用的 id 为自增 int 类型
            //如果后续后台 id 改为 UUID 此处应该调用 UUID 方法 进行设置
            let createOrUpdateApi;
            let successShowMessage = null;
            if (crudContext.pageFlag.startsWith("create")) {
                tempData.id = null;
                createOrUpdateApi = request.post(crudConfig.createApi, filterModel(tempData))
                successShowMessage = '添加';
            } else {
                createOrUpdateApi = request.put(crudConfig.updateApi, filterModel(tempData))
                successShowMessage = '更新';
            }
            //过滤 Model
            createOrUpdateApi.then(data => {

                if (crudContext.pageFlag === 'create') {
                    crudContext.tableBody.unshift(data.items);
                    //添加成功  页面总条数添加一条
                    crudContext.total = crudContext.total + 1;
                } else if (crudContext.pageFlag === 'update') {
                    //修改页面上 id 和 当前修改id 相同的 数据 实现页面的数据刷新
                    for (const v of crudContext.tableBody) {
                        if (v.id === data.items.id) {
                            //获取要修改的 index 值
                            const index = crudContext.tableBody.indexOf(v);
                            // 用 temp 进行替换
                            crudContext.tableBody.splice(index, 1, data.items);
                            //因为 id 只可能出现一次 所以一旦找到相同的 id 直接 break 即可
                            break
                        }
                    }
                }

                //关闭添加 弹出框
                crudContext.editDialog.visible = false;

                ElNotification({
                    title: successShowMessage + '成功',
                    message: '成功' + successShowMessage + ' : ' + crudContext.temp[crudConfig.editShow],
                    type: 'success',
                    duration: 4000
                })
            })
        } else {
            //校验未通过 先取消确认按钮的loading 状态
            crudContext.editDialog.confirmButtonLoading = false;
            //将焦点定位到 提示错误的 第一项上
            nextTick(() => {
                let isError = document.getElementsByClassName("is-error");
                isError[0].querySelector('input').focus();
            });
            return false;
        }
    });
}