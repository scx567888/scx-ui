//点击添加页面
import {preparationDataAndAddingRules} from "./preparationDataAndAddingRules";

export function handleCreate(crudContext, flag) {
    //设置添加确认按钮loading 为false 表示可以点击
    crudContext.editDialog.confirmButtonLoading = false;
    //设置当前页面的 flag 是 create 还是 update
    crudContext.pageFlag = flag;
    //清洗临时数据
    resetTemp(crudContext);
    //准备添加页面的下拉选 自动完成框等数据并添加校验规则
    preparationDataAndAddingRules(crudContext).then(r =>{
            crudContext.editDialog.visible = true;
            console.log(crudContext.editDialog);
    }

    );
    //弹出页面

}

//清空 temp 中的所有属性值
function resetTemp(crudContext) {
    crudContext.temp = {};
    for (let key in crudContext.items) {
        let dataEntity = crudContext.items[key];
        //向 temp(临时操作对象) 里添加所有的元素的属性 并设置值为 空字符串
        if (dataEntity.type === 'group' || dataEntity.type === 'checkbox') {
            crudContext.temp[dataEntity.prop] = [];
        } else {
            //如果有默认值在此设置
            crudContext.temp[dataEntity.prop] = dataEntity.defaultValue ? dataEntity.defaultValue : '';
        }
    }
}
