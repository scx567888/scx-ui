async function handleExcelDownload(downloadType) {
  let exportExcelMessage = '';
  let excelFileName = '';
  let nowActiveName = sessionStorage.getItem('defaultActiveName');
  let dataStr = getNowTimeStr();

  let tempList = [];
  if (downloadType === 1) {
    crudContext.handleExcelDownloadNowPageDisabled = true
    exportExcelMessage = '正在导出当前页面数据 , 请耐心等待!!!';
    excelFileName = nowActiveName + '-Excel导出表(当前)-' + dataStr;
    tempList = crudContext.tableBody;
  }
  if (downloadType === 2) {
    crudContext.handleExcelDownloadNowDisabled = true
    exportExcelMessage = '正在导出当前过滤条件数据 , 请耐心等待!!!';
    excelFileName = nowActiveName + '-Excel导出表(过滤条件)-' + dataStr;
    let filteredQueryParam = filterParams(JSON.parse(JSON.stringify(crudContext.queryParam)));
    filteredQueryParam.limit = -1;
    filteredQueryParam.page = 1;
    await request.post(crudConfig.listApi, filteredQueryParam).then(response => {
      tempList = response.items;
    });
  }
  if (downloadType === 3) {
    crudContext.handleExcelDownloadAllDisabled = true
    exportExcelMessage = '正在导出全部数据 , 请耐心等待!!!';
    excelFileName = nowActiveName + '-Excel导出表(全部)-' + dataStr;
    let queryParam = {};
    for (let key in props.scxCrudItems) {
      let tableEntity = props.scxCrudItems[key];
      if (tableEntity.defaultFilterValue) {
        queryParam[tableEntity.prop] = tableEntity.defaultFilterValue
      }
    }
    queryParam.limit = -1;
    queryParam.page = 1;
    await request.post(crudConfig.listApi, queryParam).then(response => {
      tempList = response.items;
    });
  }

  const _notify = ElNotification({
    title: '操作正在进行中...',
    message: h('div', {style: 'width:240px'}, [
      h('i', {style: "font-size:26px", class: "el-icon-loading"}),
      h('span', {}, exportExcelMessage)
    ]),
    type: 'success',
    dangerouslyUseHTMLString: true,
    duration: 0
  });

  let tHeader = [];
  let tempFilter = props.scxCrudItems.filter(col => !col.noShowInTable && col.type !== 'html')
  tempFilter.unshift({label: '序号', prop: '序号'})
  for (let key in tempFilter) {
    let tableEntity = tempFilter[key];
    tHeader.push((tableEntity.label || t(crudConfig.modelName + '.' + tableEntity.prop)));
  }
  //添加序号
  for (let i = 0; i < tempList.length; i++) {
    tempList[i]['序号'] = i + 1;
  }
  const data = formatJson(tempFilter, tempList)
  await exportJsonToExcel({
    header: tHeader,
    data,
    filename: excelFileName,
    autoWidth: true,
    bookType: 'xlsx'
  });
  _notify.close();
  if (downloadType === 1) {
    crudContext.handleExcelDownloadNowPageDisabled = false
    ElMessage({
      showClose: true,
      message: 'Excel 导出(当前) 已完成!!! 请保存!!!',
      type: 'success'
    });
  }
  if (downloadType === 2) {
    crudContext.handleExcelDownloadNowDisabled = false
    ElMessage({
      showClose: true,
      message: 'Excel 导出(当前过滤条件) 已完成!!! 请保存!!!',
      type: 'success'
    });
  }
  if (downloadType === 3) {
    crudContext.handleExcelDownloadAllDisabled = false
    ElMessage({
      showClose: true,
      message: 'Excel 导出(全部) 已完成!!! 请保存!!!',
      type: 'success'
    });
  }
}