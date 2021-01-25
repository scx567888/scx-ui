<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>

export default {
  name: 'zhilingxingrenwu',

  data() {
    return {
      tableConfig: {
        modelName: 'Danwei',//此处表示 页面 的国际化之类的
        editShow: 'danweimingcheng',
        labelWidth: '200px',
        dialogWidth: '90%',
        module: 'ims',
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
          label: '单位名称',
          prop: 'danweimingcheng', isFilter: true, maxlength: 10,
          disableInEdit: true,
          rules: {required: true, trigger: 'blur'}
        },
        {
          label: '指令性任务扣分',
          prop: 'zhilingxingrenwufenshu',
          type: 'number'
        },
      ]
    }
  }

}
</script>

