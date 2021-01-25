<template>
  <scx-crud
      :scx-crud-config="scxTableConfig"
      :scx-table-data="tableData"
  />
</template>

<script>


export default {
  name: "schoolProductionManage",
  data() {
    return {
      scxTableConfig: {
        modelName: 'SchoolProductionManage',
        editShow: 'productionName',
      },
      tableData: [
        {
          prop: 'productionName',
          isFilter: true,
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'productionCode',
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'productionType',
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'allNum',
          type: 'number',
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'useNum',
          type: 'number',
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'leaveNum',
          type: 'number',
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'otherNum',
          type: 'number',
          rules: {required: true, trigger: 'blur'}
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
