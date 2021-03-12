
// new function initCrudContext() {
//   //构建 上方的查询选项用到的 查询参数
//   for (let key in props.scxCrudItems) {
//     let tableEntity = props.scxCrudItems[key];
//     //向 temp(临时操作对象) 里添加所有的元素的属性
//     if (tableEntity.type === 'group') {
//       //group 字段 设置值为 空数组
//       crudContext.temp[tableEntity.prop] = [];
//     } else {
//       //普通的 字段 设置值为 空字符串
//       crudContext.temp[tableEntity.prop] = '';
//     }
//     //如果元素属于查询列 在 queryParam 里添加当前元素的属性 并设置值为 空字符串
//     if (tableEntity.isFilter) {
//       crudContext.queryParam.queryObject[tableEntity.prop] = ''
//     }
//     //默认过滤项参数 一般用法为设置此值 但是隐藏此项 实现页面初始化过滤
//     if (tableEntity.defaultFilterValue !== undefined) {
//       crudContext.queryParam.queryObject[tableEntity.prop] = tableEntity.defaultFilterValue
//     }
//     //如果页面有树 设置是否默认展开
//     if (tableEntity.collapseOpen) {
//       crudContext.editDialog.collapseList.push(tableEntity.prop)
//     }
//     //下拉选加载数据
//     if (tableEntity.type === 'select' || tableEntity.type === 'checkbox' || tableEntity.type === 'radio') {
//       if (tableEntity.buildUrl) {
//         //此处使用 同步 因为必须在加载整个页面数据之前  完成下拉选数据的加载
//         getOptionByBuildUrl(tableEntity.buildUrl).then(data => {
//           // optionArray 是一个类似于键值对的对象 key 存储的是 当前下拉选列的 名称
//           // value 存储的是从后台获取的下拉选的数据
//           crudContext.optionArray[tableEntity.prop] = data.items
//         })
//       } else {
//         if (Object.prototype.toString.call(tableEntity.option[0]) === "[object String]") {
//           crudContext.optionArray[tableEntity.prop] = tableEntity.option.map(o => {
//             return {label: o, value: o}
//           });
//         } else {
//           crudContext.optionArray[tableEntity.prop] = tableEntity.option
//         }
//       }
//     }
//     //获取自动完成框数据
//     if (tableEntity.autoComplete) {
//       request.post(crudConfig.autoCompleteApi + tableEntity.prop, {}).then(data => {
//         crudContext.optionArray[tableEntity.prop] = data.items
//       })
//     }
//   }
//   //当页面准备完毕 开始加载数据
//   getList();
// }