<template>
  <div>
    <scx-crud :scx-crud-config="tableConfig" :scx-edit-button-data="editButton" :scx-table-data="tableData"
              :simulate-data="getaaa()"/>
    <el-dialog :visible.sync="visible" title="标准引用管理">
      <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData2" :simulate-data="getaaa2()"/>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'shujubianji',
  data() {
    return {
      editButton: [{
        label: '标准引用管理',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.visible = true;
        }
      }],
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
          prop: 'name',
          label: '名称',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'datasource',
          label: '数据库',
          rules: {required: true, trigger: 'change'}
        }
      ],
      tableData2: [
        {
          prop: 'name',
          label: '表名',
          rules: {required: true, trigger: 'change'}
        }
      ]
    }
  }, methods: {
    getaaa() {
      var s = [{
        name: "t_teacher",
        datasource: '测试库1',
      }, {
        name: "t_student",
        datasource: '测试库1',
      }, {
        name: "t_demo",
        datasource: '测试库1',
      }, {
        name: "t_test",
        datasource: '测试库2',
      }]
      return {dataList: s, total: 4};
    },
    getaaa2() {
      var s = [{
        name: "身份证号",
        type: 'varchar',
        length: '32'
      }, {
        name: "性别",
        type: 'varchar',
        length: '50'
      }]
      return {dataList: s, total: 1};
    }
  }
}
</script>
