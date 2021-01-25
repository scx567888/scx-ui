<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
export default {
  name: 'shouwendengji',
  data() {
    return {
      tableConfig: {
        modelName: 'Jidu',//此处表示 页面 的国际化之类的
        editShow: 'jidumingcheng',
        module: 'ims',
        labelWidth: '200px',
        dialogWidth: '90%',
        hasQueryOperation: false,
        hasCreateButton: false,
        hasBatchDelete: false,
        hasPagination: false,
        hasDeleteButton: false,
        hasRightClickMenu: false,
        hasShortcutKeys: false,
        hasMultiSelectButton: false,
      },
      tableData: [
        {
          label: '季度名称',
          prop: 'jidumingcheng',
          disableInEdit: true,
          width: '150px',
        },
        {
          label: '季度开始时间',
          prop: 'startshijian',
          type: 'date-picker',
          width: '300px',
          rules: {required: true, trigger: 'blur',}
        }, {
          label: '季度结束时间',
          prop: 'endshijian',
          type: 'date-picker',
          width: '300px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '未完成任务分数',
          prop: 'jidufenshu',
          type: 'input-number',
          rules: {required: true, trigger: 'blur',}
        },
      ],
    }
  }
}
</script>

