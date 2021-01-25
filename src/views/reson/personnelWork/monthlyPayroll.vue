<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData"/>
</template>
<script>
import {checkIdCard} from "/@/utils/constant/rules"; // 这里获取身份证和密码的校验方法
export default {
  name: 'MonthlyPayroll',
  data() {
    return {
      tableConfig: {
        modelName: 'MonthlyPayroll',
        tableScrollBarHeight: null
      },
      tableData: [
        {
          prop: 'name', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'year', isFilter: true,
          width: '100px',
          rules: {required: true, trigger: 'change'}
        },
        {prop: 'month', width: '120px', type: 'number'},
        {
          prop: 'idCard', showOverflowTooltip: true, width: '180px', isFilter: true,
          maxlength: 18,
          rules: {required: true, trigger: 'change', validator: checkIdCard}
        },
        {prop: 'realWages', width: '120px', type: 'number', filterType: 'input'},
        {
          prop: 'basePay',
          width: '100px',
          type: 'number'
        },
        {
          prop: 'other', width: '100px',
        },
        {
          prop: 'insuranceAndHousingFund',
          type: 'number', width: '100px'
        },
        {prop: 'heatingCharge', type: 'number', rules: {required: true, trigger: 'change'}}
      ]
    }
  }
}
</script>
