<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData" :simulate-data="getaaa()"/>
</template>
<script>
export default {
  name: 'banbengenzong',
  data() {
    return {
      tableConfig: {
        modelName: 'banbengenzong',
        //演示信息标准版本跟踪功能
        editShow: 'projectName',
        tableScrollBarHeight: null,
        dialogWidth: '900px',
        labelWidth: '150px'
      }
      ,
      tableData: [
        {
          prop: 'id', showFlag: [],
          noShowInTable: true,
        },
        {
          prop: 'banbengaiyao', tableWidth: '30%', isFilter: true,
          label: '版本概要',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'banbenInfo', type: 'tinymce', label: '版本跟踪情况'
        },
      ]
    }
  }, methods: {
    getaaa() {
      var s = [
        {id: 1, banbengaiyao: '4.0 (正在使用)', banbenInfo: '<p>4.0 &gt; (<span style="color: #2dc26b;">增</span>)'},
        {
          id: 2,
          banbengaiyao: '3.5 (已弃用)',
          banbenInfo: '<p>3.0(beta) &gt; (<span style="color: #2dc26b;">增</span>) 3.0 &gt;&nbsp; (<span style="color: #2dc26b;">增</span>) 3.5 &gt; (<span style="color: #e03e2d;">删</span>) -</p>'
        },
        {
          id: 3,
          banbengaiyao: '2.1 (过渡版本)',
          banbenInfo: '<p>2.0 &gt; (<span style="color: #2dc26b;">增</span>) 2.1 &gt;&nbsp; (<span style="color: #e03e2d;">删</span>) -</p>'
        },
        {
          id: 4,
          banbengaiyao: '1.3 (已弃用)',
          banbenInfo: '<p>1.0 &gt; (<span style="color: #2dc26b;">增</span>) 1.2 &gt;&nbsp; (<span style="color: #2dc26b;">增</span>) 1.3 &gt; (<span style="color: #e03e2d;">删</span>) -</p>'
        },
        {
          id: 5,
          banbengaiyao: '0.7 (留存数据中)',
          banbenInfo: '<p>0.1 &gt; (<span style="color: #2dc26b;">增</span>) 0.5 &gt;&nbsp; (<span style="color: #2dc26b;">增</span>) 0.7 &gt; (<span style="color: #2d70c2;">留存</span>) </p>'
        },
      ]
      return {dataList: s, total: 5};
    }
  }
}
</script>
