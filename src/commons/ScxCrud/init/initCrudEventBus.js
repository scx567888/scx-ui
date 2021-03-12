import {reactive} from "vue";
import {bindingKeyboard} from "../handler/bindingKeyboard";
import {getList} from "../handler/getList";

const defaultCrudEventBus = {
    //绑定键盘翻页事件
    bindingKeyboard: () => {
    },
    //查询事件
    handleFilter: () => {
    },
    //获取列表事件
    getList: () => {
    },
    handleCreate: () => {
    },
    handleExcelDownload: () => {
    }
}

export function initCrudEventBus(crudContext) {
    const crudEventBus = reactive(defaultCrudEventBus);
    crudEventBus.bindingKeyboard = (e) => bindingKeyboard(e, crudContext);
    crudEventBus.getList = () => getList(crudContext);
    crudEventBus.handleExcelDownload = (e) => {
        crudContext.config.hasCreateButton = !crudContext.config.hasCreateButton
    };
    return crudEventBus;
}