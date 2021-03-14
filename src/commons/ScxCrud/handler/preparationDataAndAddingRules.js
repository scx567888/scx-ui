import {nextTick} from "vue";
import {formatRules} from "./formatRules";
import {strToArray} from "../../../utils";
import {getOptionByBuildUrl} from "./getOptionByBuildUrl";

export async function preparationDataAndAddingRules(crudContext) {
    let nowFormData = crudContext.items;
    //对当前选中行的数据的格式进行 清洗过滤 便于在修改页面中展示
    for (let key in nowFormData) {
        let tableEntity = nowFormData[key];
        //首先生成页面的下拉选
        if (tableEntity.type === 'select' && tableEntity.buildUrl) {
            await getOptionByBuildUrl(tableEntity.buildUrl).then(data => {
                crudContext.optionArray[tableEntity.prop] = data.items
            })
        }
        //此处分为两类一种是 添加时 一种是修改时
        if (crudContext.pageFlag === 'create') {
            //首先给默认值
            // 这种类型 是在页面中自行添加 html 标签用的 每次都要把 上一次的 清除掉
            if (tableEntity.type === 'html') {
                let index = nowFormData.indexOf(tableEntity);
                nowFormData.splice(index, 1);
            }

        } else if (crudContext.pageFlag === 'update') {
            //这种类型 不想再修改页面显示值 比如 password 等
            if (tableEntity.noShowValueInEdit) {
                crudContext.temp[tableEntity.prop] = ''
            }
            //如果是 区域级联选择器
            if (tableEntity.type === 'region') {
                //如果 temp 存储的 不是 数组 先把 str 转为 数组
                crudContext.temp[tableEntity.prop] = strToArray(crudContext.temp[tableEntity.prop], true)

            }  //如果是 区域级联选择器
            if (tableEntity.type === 'checkbox') {
                //如果 temp 存储的 不是 数组 先把 str 转为 数组
                crudContext.temp[tableEntity.prop] = strToArray(crudContext.temp[tableEntity.prop])
            }
        }
        //对校验规则进行设置
        if (tableEntity.rules) {
            crudContext.rules[tableEntity.prop] = [formatRules(crudContext, tableEntity)]
        }
        //如果是 group 类型 则要对里面的数据进行校验
        if (tableEntity.type === 'group') {
            let groupRules = 0;
            if (crudContext.temp[tableEntity.prop]) {
                groupRules = crudContext.temp[tableEntity.prop].length - 1;
            }
            for (let i = 0; i <= groupRules; i++) {
                for (let key1 in tableEntity.groupItem) {
                    let groupItemRules = tableEntity.groupItem[key1];
                    //对校验规则进行设置
                    if (groupItemRules.rules) {
                        crudContext.rules[tableEntity.prop + '.' + i + '.' + groupItemRules.prop] = [formatRules(groupItemRules)]
                    }
                }
            }
        }
    }
    //清空当前表单的校验
    await nextTick(() => {
        // crudContext.scxCreateAndUpdateFormRef.clearValidate()
    })
}
