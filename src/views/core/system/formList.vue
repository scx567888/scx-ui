<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData" :scx-edit-buttons="editButtonData"/>
</template>
<script>

export default {
  name: 'formList',
  data() {
    return {
      tableConfig: {
        editShow: 'name',
        modelName: 'form',
        module: 'workflow',
        operationWidth: '380px'
      },
      tableData: [
        {prop: 'name', label: '表单名称'},
        {prop: 'remark', label: '备注'},
      ],
      editButtonData: [
        {
          label: '表单设计',
          color: 'success',
          doSomeThing: (row) => this.setting(row)
        },
      ]
    }
  },
  methods: {
    //此处 第一个值是 点击的对象 第二个查询条件对象 右侧有下拉选的不用管他 会自动更新
    setting(row) {
      this.$router.push({path: '/workflow/formMarker', query: {id: row.id}});
    }
  }
}
</script>
