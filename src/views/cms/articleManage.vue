<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>
<script type="text/jsx">

export default {
  name: 'Test',
  data() {
    return {
      tableConfig: {
        modelName: 'Article',
        editShow: 'articleTitle',
        tableScrollBarHeight: null,
        dialogWidth: '900px',
        labelWidth: '150px',
        module: 'cms'
      }
      ,
      tableData: [
        {
          prop: 'articleTitle', tableWidth: '120px', isFilter: true,
          autoComplete: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'columnId', tableWidth: '120px', isFilter: true,
          type: 'select', buildUrl: '/api/Cms/coLumn/list',
          labelProp: 'columnName',
          valueProp: 'id',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'articleContent', type: 'tinymce',
          tableLabelFormat: (o) => o.articleContent.substring(0, 50),
          showOverflowTooltip: true
        }
      ]
    }
  }
}
</script>
