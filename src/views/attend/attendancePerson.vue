<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
import request from "/@/utils/request";

export default {
  name: 'AttendancePerson',
  data() {
    return {
      deptList: [],
      tableConfig: {
        modelName: 'user',
        module: 'core',
        customizeTemp: this.customizeTemp
      },
      tableData: [
        {
          prop: 'realName', width: '100px',
          label: '姓名',
          isFilter: true,
          hasSort: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'idCard', width: '100px',
          label: '证件号',
          isFilter: true,
          hasSort: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'personOrder', width: '100px',
          label: '排序',
          hasSort: true,
          type: 'number',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'deptIds',
          type: 'treeSelect',
          defaultExpandedKeys: [44],
          // type: 'tree',
          showCheckbox: true,//是否显示 checkbox 默认不显示
          collapseOpen: false,
          isFilter: true,
          tableLabelFormat: this.deptFormat,
          buildUrl: '/api/core/dept/list',
          labelProp: 'deptName',
          valueProp: 'id'
        },
        {
          prop: 'superAdmin',
          defaultFilterValue: false,
          defaultValue: false,
          noShowInTable: true,
          showFlag: [],
        }
      ]
    }
  },
  methods: {
    customizeTemp(o) {
      o.username = o.realName
      o.password = 'password'
      this.$set(o, 'userType', 1);
      return o;
    },
    deptFormat(o) {
      var deptIdsList = o.deptIds.split(",")
      var a = this.deptList.filter(d => deptIdsList.includes(d.id + ''))
      var b = a.map(t => t.deptName)
      return b.join(",");
    }
  },
  created() {
    request.post("/api/core/dept/list").then(o => {
      this.deptList = o.items
    })
  },
  activated() {
    request.post("/api/core/dept/list").then(o => {
      this.deptList = o.items
    })
  }
}
</script>
