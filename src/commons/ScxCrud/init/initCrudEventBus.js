import {reactive} from "vue";
import {bindingKeyboard} from "../handler/bindingKeyboard";
import {getList} from "../handler/getList";
import {handleCreate} from "../handler/handleCreate";

const defaultCrudEventBus = {
    //绑定键盘翻页事件
    bindingKeyboard: () => {
        console.warn("Default Event : bindingKeyboard")
    },
    //查询事件
    handleFilter: () => {
        console.warn("Default Event : handleFilter")
    },
    //获取列表事件
    getList: () => {
        console.warn("Default Event : getList")
    },
    handleCreate: () => {
        console.warn("Default Event : handleCreate")
    },
    handleExcelDownload: () => {
        console.warn("Default Event : handleExcelDownload")
    },
    getPlaceholder: () => {
        console.warn("Default Event : getPlaceholder")
    },
    createOrUpdateModel: () => {
        console.warn("Default Event : createOrUpdateModel")
    },
    batchDeleteModel: () => {
        console.warn("Default Event : batchDeleteModel")
    },
    previousPage:()=>{
        console.warn("Default Event : previousPage")
    }
}

export function initCrudEventBus(crudContext) {
    const crudEventBus = reactive(defaultCrudEventBus);

    crudEventBus.getList = () => getList(crudContext);
    crudEventBus.handleExcelDownload = (e) => {
        crudContext.config.hasCreateButton = !crudContext.config.hasCreateButton
    };
    crudEventBus.handleCreate = (flag) => handleCreate(crudContext, flag);

    crudEventBus.previousPage=()=>{}
    crudEventBus.bindingKeyboard = (e) => bindingKeyboard(e, crudContext);
    return crudEventBus;
}
