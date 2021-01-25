<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData" :scx-edit-buttons="editButtonData"/>
</template>
<script>

export default {
  name: 'Workflow',
  data() {
    return {
      tableConfig: {
        editShow: 'name',
        modelName: 'Process',
        module: 'workflow',
        operationWidth: '380px',
        hasCreateButton: true,
        hasUpdateButton: true,
        hasDeleteButton: true
      },
      tableData: [
        {prop: 'name', label: '流程名称'},
      ],
      editButtonData: [
        {
          label: '流程配置',
          colorType: 'success',
          callback: (row) => this.setting(row)
        },
      ]
    }
  },
  methods: {
    //此处 第一个值是 点击的对象 第二个查询条件对象 右侧有下拉选的不用管他 会自动更新
    setting(row) {
      this.$router.push({path: '/workflow/modeler', query: {id: row.id}});
    }
  }
}
</script>
