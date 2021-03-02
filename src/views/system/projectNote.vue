<template>
  <scx-crud :scx-crud-config="crudConfig" :scx-crud-items="crudItems"/>
</template>
<script>
export default {
  name: 'ProjectNote',
  data() {
    return {
      crudConfig: {
        modelName: 'scxlog',
        module: 'reson',
        editShow: 'projectName',
        tableScrollBarHeight: null,
        dialogWidth: '900px',
        labelWidth: '150px',
        // tableMaxHeight:'300px' // 此项为 null 则 table 没有高度限制 ps. 数据多的时候可能会卡
        tableMaxHeight:'300px'
      },
      crudItems: [
        {
          prop: 'userIp', tableWidth: '120px', isFilter: true,
          autoComplete: true,
          hasSort: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'serverType', tableWidth: '150px', isFilter: true, hasSort: true,
          autoComplete: true
        },
        {
          prop: 'remoteUrl', tableWidth: '180px', isFilter: true, hasSort: true,
          showOverflowTooltip: true,
          maxlength: 200,
          type: 'link',
          filterWidth: '150px',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'username', tableWidth: '120px', hasSort: true,
          showOverflowTooltip: true,
          type: 'switch',
          isFilter: true,
          option: [{value: 0, label: '启用'}, {value: 1, label: '停用'}],
        },
        {prop: 'password', tableWidth: '100px', showOverflowTooltip: true, hasSort: true,},
        {prop: 'databaseUserName', tableWidth: '140px', showOverflowTooltip: true, hasSort: true,},
        {prop: 'databasePassword', showOverflowTooltip: true, hasSort: true,},
        {prop: 'remarks', type: 'tinymce', showOverflowTooltip: true, minRows: 2, hasSort: true,}
      ]
    }
  }
}
</script>
