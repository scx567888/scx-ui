<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>

export default {
  name: 'UserManage',
  data() {
    return {
      tableConfig: {
        modelName: 'User',//此处表示 页面 的国际化之类的
        module: 'core',
        apiModelName: 'User',//此处是 api 后台的实体类名称 当有此值时 api 的构建会覆写 modelName
        editShow: 'username',
        hasExcelDownloadTemplateButton: false,
        hasBatchDelete: false,
        hasPagination: false,
        hasQueryOperation: false,
        //在添加按钮中 是否有 Excel 导入功能
        hasExcelImport: false,
        //在添加按钮中 是否有 Excel 下载当前页面功能
        hasExcelDownloadNowDisabled: false,
        //在添加按钮中 是否有 Excel 下载过滤条件功能
        hasExcelDownloadNowFilterDisabled: false,
        //在添加按钮中 是否有 Excel 全部导出
        hasExcelDownloadAllDisabled: false,
        hasRightClickMenu: false,
        hasShortcutKeys: false,
        hasMultiSelectButton: false,
        hasDeleteButton: false,

      },
      tableData: [
        {
          prop: 'username', isFilter: true, maxlength: 10,
          disableInEdit: true,
          createPlaceholder: '请输入用户名',
          rules: {required: true, trigger: 'blur', isUnique: true}
        },
        {
          prop: 'password',
          type: 'password',
          maxlength: 15,
          noShowInTable: true,
          noShowValueInEdit: true,
          noCheckInEdit: true,
          createPlaceholder: '请输入密码',
          editPlaceholder: '留空则不修改',
          rules: {required: true, trigger: 'change'}
        },
      ]
    }
  }
}
</script>

