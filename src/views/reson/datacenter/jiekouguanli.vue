<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData" :simulate-data="getaaa()"/>
</template>
<script>
export default {
  name: 'shujubianji',
  data() {
    return {
      visible: false,
      tableConfig: {
        modelName: 'shujubianji',
        editShow: 'name',
        tableScrollBarHeight: null,
        dialogWidth: '900px',
        labelWidth: '150px',
        operationWidth: '380px',
      },
      tableData: [
        {
          prop: 'id',
          label: '接口名称',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'a',
          label: '地址',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'b',
          label: '备注',
          rules: {required: true, trigger: 'change'}
        }
      ],
    }
  }, methods: {
    getaaa() {
      var s = [{
        id: "测试",
        a: '/api/demo',
      }, {
        id: "测试接口",
        a: '/api/demo/list',
      }, {
        id: "测试接口List",
        a: '/api/student/list',
      },]
      return {dataList: s, total: 3};
    },
  }
}
</script>
