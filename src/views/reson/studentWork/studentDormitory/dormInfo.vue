<template>
  <scx-crud :scx-crud-config="scxTableConfig"
            :scx-table-data="tableData"
  />
</template>
<script>

export default {
  name: 'DormInfo',
  data() {
    return {
      scxTableConfig: {
        modelName: 'Dorm',
        tableInline: false,
        labelWidth: '150px',
      },
      tableData: [
        {
          prop: 'dormName',
          width: '200px',
          isFilter: true,
          maxlength: 10,
          rules: {required: true, trigger: 'blur',}
        },
        {
          placeholder: '请选择寝室所属楼栋',
          type: 'select',
          buildUrl: '/api/Building/list',
          labelProp: 'buildingName',
          valueProp: 'id',
          prop: 'dormBuilding',
          filterWidth: '170px',
          width: '200px',
          isFilter: true,
          rules: {required: true, trigger: 'blur'}
        },
        {
          type: 'textarea', prop: 'dormAddress', isFilter: true, maxlength: 200,
          rules: {required: true, trigger: 'blur'}
        },
      ],
    }
  }
}
</script>
