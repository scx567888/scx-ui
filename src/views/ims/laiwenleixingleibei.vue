<template>
  <scx-table :scxTableConfig="tableConfig" :tableData="tableData"/>
</template>

<script>
export default {
  name: 'UserManage',
  data() {
    return {
      tableConfig: {
        modelName: 'LaiWenLeiXingLeiBei',//此处表示 页面 的国际化之类的
        editShow: 'name',
        hasExcelDownloadTemplateButton: false,
        hasBatchDelete: false,
        hasQueryOperation: true,
        //在添加按钮中 是否有 Excel 导入功能
        hasExcelImport: false,
        //在添加按钮中 是否有 Excel 下载当前页面功能
        hasExcelDownloadNowDisabled: false,
        //在添加按钮中 是否有 Excel 下载过滤条件功能
        hasExcelDownloadNowFilterDisabled: false,
        //在添加按钮中 是否有 Excel 全部导出
        hasExcelDownloadAllDisabled: true,
        hasRightClickMenu: false,
        hasShortcutKeys: false,
        hasMultiSelectButton: false,
        labelWidth:'120px'
      },
      tableData: [
        {
          prop: 'name', isFilter: true, maxlength: 20,
          label: '类别名称 (导出表格时用)',
          createPlaceholder: '请输入获取途径名称',
          rules: {required: true, trigger: 'blur', isUnique: true}
        },
        {
          prop: 'fenShu', isFilter: true, maxlength: 10,
          label: '分数',
          type:'input-number',
          tableLabelFormat: (o) =>'<span style="color: #00a73e">'+o.fenShu+'</span>' ,
          createPlaceholder: '请输入分数',
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'huoQuTuJingOrder', isFilter: true, maxlength: 10,
          label: '表格中排序',
          type:'input-number',
          createPlaceholder: '请输入排序',
          rules: {required: true, trigger: 'blur'}
        }
      ]
    }
  }
}
</script>

