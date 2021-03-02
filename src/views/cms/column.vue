<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>
<script type="text/jsx">

export default {
  name: 'Test',
  data() {
    return {
      tableConfig: {
        modelName: 'Column',
        editShow: 'articleTitle',
        tableScrollBarHeight: null,
        dialogWidth: '900px',
        labelWidth: '150px',
        module: 'cms'
      }
      ,
      tableData: [
        {
          prop: 'id', showOverflowTooltip: true,
          disableInEdit: true,
          tableWidth: '100px',
          showFlag: ['update']
        },
        {
          prop: 'columnName', isFilter: true,
          autoComplete: true,
          rules: {required: true, trigger: 'change'}
        },
        {prop: 'columnPath', showOverflowTooltip: true},
      ]
    }
  }
}
</script>
