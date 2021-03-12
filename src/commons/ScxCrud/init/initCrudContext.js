import {reactive} from "vue";

//整个 context 的默认数据结构
const defaultCrudContext = {
    optionArray: {},//用来存储所有下拉选 和自动完成框的数据
    pageFlag: '',//当前页面类型 根据这个进行 添加页面的元素过滤 如 create update 等
    temp: {},//数据操作的临时对象 !!!很重要!!!
    tableBody: [],//整个表格列表的数据
    tableLoading: true,//table 加载状态
    queryParam: {page: 0, limit: 10, orderBy: {orderByColumn: 'id', sortType: 'desc'}, queryObject: {}},//查询参数 page : 请求页数 , limit : 一页数量 ,sort : 正序还是倒序 ,orderBy : 排序依据的字段 默认是根据 id 这样速度最快
    total: 0,//总条数
    rules: {},//添加和修改页面的 表单验证条件 此值会根据 tableDate 自动构建
    handleExcelDownloadNowPageDisabled: false,//下载当前页 Excel 的条目是否禁用状态 用于防止重复点击
    handleExcelDownloadNowDisabled: false,//下载当前过滤条件的 Excel 的条目是否禁用状态 用于防止重复点击
    handleExcelDownloadAllDisabled: false,//下载全部 Excel 的条目是否禁用状态 用于防止重复点击
    editDialog: {
        confirmButtonLoading: false,//添加或修改页面的 确认按钮是否处于 loading 状态 防止重复点击 造成多条数据添加
        visible: false,//添加和删除的的 dialog 显示状态
        collapseList: []
    },
    deleteDialog: {   //删除的 dialog 显示状态
        visible: false,//批量删除确认框显示状态
        batchDeleteButtonVisible: false,//左下角 批量删除按钮的弹框显示状态
        tableBody: [],//删除对话框 显示的 要删除的数据
    },
    originalConfig: [],//未处理的 config
    originalAddButtons: [],//未处理的 addButtons
    originalEditButtons: [],//未处理的 editButtons
    originalItems: [],//未处理的 items
    config: {
        editShow: false,//添加 修改 删除 或恢复删除 时 右侧通知消息 显示的字段
        modelName: false,//实体类的名称  用于构建 Api 和国际化
        tableInline: true,//添加  或修改 弹出页面是否显示为 两列 默认为两列
        labelWidth: '100px',//添加 和修改页面的 label 的宽度 默认 '100px'
        dialogWidth: '50%',//弹出框的宽度 默认50%
        operationWidth: '160px',//操作列宽度
        hasCreateButton: true,//是否有添加按钮
        hasQueryOperation: true,//是否有查询项
        hasUpdateButton: true,//是否有更新按钮 注意 如果此两项 都为 false 则不显示 操作
        hasDeleteButton: true,//是否有删除按钮
        hasRightClickMenu: true,//是否有右键菜单
        hasTableOperation: true,//是否有表格右侧的 操作列 注意 此项不控制 右键菜单的 删除 与编辑
        hasMultiSelectButton: true,// 是否有多选按钮
        hasPagination: true,// 是否有分页组件 注意若不显示分页 则列表会一次查询出来
        hasBatchDelete: true,//是否有 批量删除 此项同时控制 下方的批量删除按钮 和键盘的delete 快捷键 (如果 hasShortcutKeys 为 true)
        hasShortcutKeys: true,// 是否有键盘快捷键
        hasExcelDownloadTemplateButton: true,
        hasExcelImport: true,
        hasExcelDownloadNowDisabled: true,//在添加按钮中 是否有 Excel 下载当前页面功能 //添加按钮的下拉选配置 注意!!! 若全部为 false 则 添加按钮会由下拉框按钮变为 普通的按钮
        hasExcelDownloadNowFilterDisabled: true, //在添加按钮中 是否有 Excel 下载过滤条件功能
        hasExcelDownloadAllDisabled: true,//在添加按钮中 是否有 Excel 全部导出
        listApi: false,
        createApi: false,
        deleteApi: false,
        revokeDeleteApi: false,
        checkUniqueApi: false,
        updateApi: false,
        autoCompleteApi: false,
        batchDeleteApi: false,
        infoApi: false,
        tableMaxHeight: '524px',// 表格是否使用内部滚动条并设置高度 如果不需要请设置为 null
        appendToBody: false,// 在父容器中使用 dialog 时请设置为 true 注意 正常状况不要进行设置 会导致 tinymce 失效
        customizeTemp: null,
    },
    addButtons: [],//添加按钮的数据
    editButtons: [],//右侧编辑按钮的数据
    items: [],//处理后
}

export function initCrudContext(prop) {
    const crudContext = reactive(defaultCrudContext);
    initCrudConfig(crudContext, prop.scxCrudConfig)
    initCrudItems(crudContext, prop.scxCrudItems)
    initAddButtons(crudContext, prop.scxAddButtons)
    initEditButtons(crudContext, prop.scxEditButtons)
    return crudContext;
}

function initCrudConfig(crudContext, newVal) {
    //原始值 保留使用
    crudContext.originalConfig = newVal
    Object.assign(crudContext.config, newVal);
    crudContext.config.editShow = newVal.editShow ? newVal.editShow : newVal.scxCrudItems[0].prop;
    const baseCrudApi = '/api/' + crudContext.config.modelName;
    crudContext.config.listApi = newVal.listApi ? newVal.listApi : baseCrudApi + '/list';
    crudContext.config.createApi = newVal.createApi ? newVal.createApi : baseCrudApi;
    crudContext.config.deleteApi = newVal.deleteApi ? newVal.deleteApi : baseCrudApi + '/';
    crudContext.config.revokeDeleteApi = newVal.revokeDeleteApi ? newVal.revokeDeleteApi : baseCrudApi + '/revokeDelete/';
    crudContext.config.checkUniqueApi = newVal.checkUniqueApi ? newVal.checkUniqueApi : baseCrudApi + '/checkUnique';
    crudContext.config.updateApi = newVal.updateApi ? newVal.updateApi : baseCrudApi;
    crudContext.config.autoCompleteApi = newVal.autoCompleteApi ? newVal.autoCompleteApi : baseCrudApi + '/getAutoComplete/';
    crudContext.config.batchDeleteApi = newVal.batchDeleteApi ? newVal.batchDeleteApi : baseCrudApi + '/batchDelete';
    crudContext.config.infoApi = newVal.infoApi ? newVal.infoApi : baseCrudApi + '/';
}

function initCrudItems(crudContext, newVal) {
    //原始值 保留使用
    crudContext.originalItems = newVal;
    newVal.forEach(item => {
        if (item.prop === undefined || item.prop === null) {
            console.error("[ScxCrud] Item 缺失必须属性 prop !!! : " + JSON.stringify(item));
        } else {
            const i = filterItem(item);
            if (i !== null && i !== undefined) {
                crudContext.items.push(i);
            }
        }
    })
}

function filterItem(item) {

    if (item.type === 'input' || item.type === undefined) {
        return filterItemTypeInput(item);
    }
    if (item.type === 'select') {
        return filterItemTypeSelect(item);
    }
    if (item.type === 'password') {
        return filterItemTypePassword(item);
    }
    if (item.type === 'switch') {
        return filterItemTypeSwitch(item);
    }
    if (item.type === 'tree') {
        return filterItemTypeTree(item);
    }
    if (item.type === 'number') {
        return filterItemTypeNumber(item);
    }
    if (item.type === 'region') {
        return filterItemTypeRegion(item);
    }
    if (item.type === 'textarea') {
        return filterItemTypeTextarea(item);
    }
    if (item.type === 'date') {
        return filterItemTypeDate(item);
    } else {
        console.warn("[ScxCrud] Item type 未知 !!! : " + JSON.stringify(item))
    }
    // console.log(item);

}

/**
 * 过滤 input 类型的 item
 * @param item
 */
function filterItemTypeInput(item) {
    return item;
}

/**
 * 过滤 select 类型的 item
 * @param item
 */
function filterItemTypeSelect(item) {
    //select 类型的必须要有 labelProp 和 valueProp
    if (item.labelProp === undefined || item.labelProp == null) {
        console.error("[ScxCrud] Item Type:Select 缺失必须属性 !!! labelProp 已采用默认值 [label] !!! : " + JSON.stringify(item));
        item.labelProp = 'label';
    }
    if (item.valueProp === undefined || item.valueProp == null) {
        console.error("[ScxCrud] Item Type:Select 缺失必须属性 !!! valueProp 已采用默认值 [id] !!! : " + JSON.stringify(item));
        item.valueProp = 'id';
    }
    if (item.option) {
        if (item.option.length > 0) {
            const isObject = Object.prototype.toString.call(item.option[0]) === '[object Object]';
            if (!isObject) {
                console.warn("[ScxCrud] Item Type:Select  检测到 option 不为对象已自动转换 !!! " + JSON.stringify(item))
                const tempOption = [];
                item.option.forEach(o => {
                    const s = {};
                    s[item.labelProp] = o;
                    s[item.valueProp] = o;
                    tempOption.push(s)
                });
                item.option = tempOption;
            }
        }
        return item;
    }

    if (item.buildUrl === undefined || item.buildUrl === null) {
        console.error("[ScxCrud] Item Type:Select 数据源错误 option 和 buildUrl 必须存在其中一个 !!! " + JSON.stringify(item))
        return null;
    }

    return item;
}

/**
 * 过滤 password 类型的 item
 * @param item
 */
function filterItemTypePassword(item) {
    return item;
}

/**
 * 过滤 switch 类型的 item
 * @param item
 */
function filterItemTypeSwitch(item) {
    return item;
}

/**
 * 过滤 number 类型的 item
 * @param item
 */
function filterItemTypeNumber(item) {
    return item;
}

/**
 * 过滤 tree 类型的 item
 * @param item
 */
function filterItemTypeTree(item) {
    return item;
}

/**
 * 过滤 date 类型的 item
 * @param item
 */
function filterItemTypeDate(item) {
    return item;
}

/**
 * 过滤 区域级联器 类型的 item
 * @param item
 */
function filterItemTypeRegion(item) {
    return item;
}

/**
 * 过滤 textarea 类型的 item
 * @param item
 */
function filterItemTypeTextarea(item) {
    item.type = 'input'
    item.textareaType = "textarea"
    item.maxlength = item.maxlength ? item.maxlength : 200
    item.showWordLimit = item.showWordLimit ? item.showWordLimit : true
    item.textareaType = "textarea"
    return item;
}

/**
 * 初始化 添加按钮 (实际过滤会在 其他组件中进行)
 * @param crudContext
 * @param newVal
 */
function initAddButtons(crudContext, newVal) {
    //原始值 保留使用
    crudContext.originalAddButtons = newVal;
    newVal.forEach(n => crudContext.addButtons.push(n));

}

/**
 * 初始化 编辑按钮 (实际过滤会在 其他组件中进行)
 *
 */
function initEditButtons(crudContext, newVal) {
    //原始值 保留使用
    crudContext.originalEditButtons = newVal;
    newVal.forEach(n => crudContext.editButtons.push(n));
}