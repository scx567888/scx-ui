<template>
  <scx-crud :scx-crud-config="scxTableConfig" :scx-table-data="tableData"/>
</template>
<script>

export default {
  name: 'ClassRoom',
  data() {
    return {
      scxTableConfig: {
        modelName: 'ClassRoom',
      },
      tableData: [
        {
          label: '教室名称', prop: 'classRoomName', width: '250px', isFilter: true, maxlength: 15,
          rules: {required: true, trigger: 'change',}
        }, {
          label: '容纳人数', prop: 'accommodatingPopulation', maxlength: 15,
          filterWidth: '150px',
          type: 'number', minNumber: 1, defaultValue: 1, maxNumber: 999999999,
        }, {
          label: '使用状态', prop: 'usageState', width: '200px', isFilter: true, maxlength: 15,
          type: 'select',
          selectOption: ['空闲', '使用中'],
          filterWidth: '150px',
          placeholder: '请选择使用状态',
        }, {
          label: '所属楼宇', prop: 'trainingBaseBuild', width: '200px', isFilter: true, maxlength: 15,
          type: 'select',
          buildUrl: '/api/TrainingBaseBuild/list',
          labelProp: 'buildName',
          valueProp: 'id',
          filterWidth: '150px',
          placeholder: '请选择楼宇类型',
        }
      ],
    }
  }
}
</script>
