<template>
  <scx-crud :scx-crud-config="scxTableConfig" :scx-table-data="tableData"/>
</template>
<script>

export default {
  name: 'BuildingInfo',
  data() {
    return {
      scxTableConfig: {
        modelName: 'Building',
        tableInline: false,
      },
      tableData: [
        {
          prop: 'buildingName',
          width: '200px',
          isFilter: true,
          maxlength: 10,
          rules: {required: true, trigger: 'blur', isUnique: true}
        },
        {
          type: 'textarea',
          prop: 'buildingAddress',
          autoComplete: true,
          isFilter: true,
          filterWidth: '140px',
          maxlength: 200,
          rules: {required: true, trigger: 'blur',}
        }],
    }
  }
}
</script>
