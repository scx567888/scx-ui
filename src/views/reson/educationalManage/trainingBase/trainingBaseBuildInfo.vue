<template>
  <scx-crud :scx-crud-config="scxTableConfig" :scx-table-data="tableData"/>
</template>
<script>

export default {
  name: 'TrainingBaseBuild',
  data() {
    return {
      scxTableConfig: {
        modelName: 'TrainingBaseBuild',
      },
      tableData: [
        {
          prop: 'buildName', width: '250px', isFilter: true, maxlength: 15,
          filterWidth: '150px', rules: {required: true, trigger: 'change',}
        }, {
          prop: 'buildType', width: '200px', isFilter: true, maxlength: 15,
          type: 'select',
          option: ['办公楼', '教学楼', '实训楼', '寝室楼', '行政楼'],
          filterWidth: '150px',
          placeholder: '请选择楼宇类型',
        }, {
          prop: 'campus', width: '200px', isFilter: true, maxlength: 15,
          type: 'select',
          selectOption: ['本部', '第一分部', '第二分部'],
          filterWidth: '150px',
          placeholder: '请选择所在校区',
        }, {
          prop: 'buildArea', maxlength: 15,
          filterWidth: '150px',
          type: 'number', minNumber: 1, defaultValue: 1, maxNumber: 999999999,
        }
      ]
    }
  }
}
</script>
