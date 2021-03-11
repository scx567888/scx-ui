<template>
  <scx-table :scxTableConfig="tableConfig" :tableData="tableData"/>
</template>

<script>


export default {
  name: 'shouwendengji',
  data() {
    return {
      tableConfig: {
        modelName: 'PiShiXiang',//此处表示 页面 的国际化之类的
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
          label: '批示项名称',
          prop: 'name',
          isFilter:true
        },
        {
          label: '分数',
          prop: 'fenShu',
          type: 'input-number',
          rules: {required: true, trigger: 'blur',}
        }
      ],
    }
  }
}
</script>

