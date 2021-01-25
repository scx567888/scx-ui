<template>
  <scx-crud :scx-crud-config="scxTableConfig" :scx-table-data="tableData"/>
</template>
<script>

export default {
  name: 'ConferenceVenue',
  data() {
    return {
      scxTableConfig: {
        modelName: 'ConferenceVenue',
      },
      tableData: [
        {
          prop: 'conferenceVenueName', width: '250px', isFilter: true, maxlength: 15,
          filterWidth: '150px', rules: {required: true, trigger: 'change',}
        }, {
          prop: 'accommodatingPopulation', maxlength: 15,
          filterWidth: '150px',
          type: 'number', minNumber: 1, defaultValue: 1, maxNumber: 999999999,
        }, {
          prop: 'usageState', width: '200px', isFilter: true, maxlength: 15,
          type: 'select',
          selectOption: ['空闲', '使用中'],
          filterWidth: '150px',
          placeholder: '请选择使用状态',
        }, {
          prop: 'trainingBaseBuild', width: '200px',
          isFilter: true,
          maxlength: 15,
          type: 'select',
          filterType: 'input',
          buildUrl: '/api/TrainingBaseBuild/list',
          labelProp: 'buildName',
          valueProp: 'id',
          filterWidth: '150px',
          placeholder: '请选择所属楼宇',
          tableColumnFormat: this.aaa,
          filterColumnFormat: this.bbb,
          rules: {required: true, trigger: 'change',}
        }
      ],
    }
  }, methods: {
    aaa(tableCol, val, selectOptionArrayValue) {
      return selectOptionArrayValue['buildName'] + "嗣昌绪";
    },
    bbb(tableCol, val) {
      return tableCol[val.selectByUrlLabel] + "嗣昌绪" + tableCol['id'];
    }
  }
}
</script>
