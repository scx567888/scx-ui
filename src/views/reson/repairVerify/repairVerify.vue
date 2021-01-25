<template>
  <scx-crud :scShow="tableConfig.scShow" :scxTableConfig="tableConfig" :tableData="tableData"/>
</template>
<script>
export default {
  name: 'RepairVerify',
  data() {
    return {
      tableConfig: {
        modelName: 'RepairVerify',
        scShow: true,
        tableInline: false,
        hasSPUpdateButton: false

      },
      tableData: [
        {
          label: "报修人", prop: 'repairUser', isFilter: true,
          showFlag: ['create', 'update', 'ccc'],
          rules: {required: true, trigger: 'change'}
        },
        {
          label: "报修电话", prop: 'repairTel', isFilter: true,
          showFlag: ['create', 'update', 'ccc'],
          rules: {required: true, trigger: 'change'}
        },
        {
          label: "报修办公室", prop: 'office', isFilter: true,
          showFlag: ['create', 'update', 'ccc'],
          rules: {required: true, trigger: 'change'}
        },
        {
          label: "办公室门牌", prop: 'officeNum', isFilter: true,
          showFlag: ['create', 'update', 'ccc'],
          width: '200px',
          rules: {required: true, trigger: 'change'}
        },
        {
          label: "报修设备", prop: 'repairDevice', isFilter: false,
          showFlag: ['create', 'update', 'ccc'],
          rules: {required: true, trigger: 'change'}
        },
        {
          label: "设备型号", prop: 'deviceInfo', isFilter: false,
          showFlag: ['create', 'update', 'ccc'],
          rules: {required: true, trigger: 'change'}
        },
        {
          label: "故障描述", prop: 'repairInfo', isFilter: false,
          showFlag: ['create', 'update', 'ccc'],
          rules: {required: true, trigger: 'change'}
        },
        {
          label: "意见详情", prop: 'ffffff', isFilter: false,
          type: 'textarea',
          noShowInTable: true,
          showFlag: ['ccc'],
          rules: {required: true, trigger: 'change'}
        },
      ]
    }
  }
}
</script>
