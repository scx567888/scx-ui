<template>
  <scx-table :scxTableConfig="tableConfig" :tableData="tableData"/>
</template>

<script>

export default {
  name: 'LaiWenDanWei',
  data() {
    return {
      tableConfig: {
        modelName: 'LaiWenDanWei',//此处表示 页面 的国际化之类的
        editShow: 'name',
        labelWidth: '200px',
        dialogWidth: '90%',
        hasBatchDelete: false,
        hasPagination: false,
        hasDeleteButton: false,
        hasRightClickMenu: false,
        hasShortcutKeys: false,
        hasMultiSelectButton: false,
      },
      tableData: [
        {
          label: '单位名称',
          prop: 'name', isFilter: true, maxlength: 16,
          rules: {required: true, trigger: 'blur'}
        },
        {
          label: '指令性任务扣分',
          prop: 'zhiLingXingRenWuKouFen',
          type: 'input-number'
        },
      ]
    }
  }

}
</script>

