<template>
  <div>
    <scx-crud :scx-crud-config="tableConfig" :scx-edit-button-data="editButton" :scx-table-data="tableData2"
              :simulate-data="getaaa()"/>
    <el-dialog :visible.sync="visible" title="表结构管理">
      <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData" :simulate-data="getaaa2()"/>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'shujubianji',
  data() {
    return {
      value: '',
      visible2: false,
      editButton: [{
        label: '表结构管理',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.visible = true;
        }
      }, {
        label: '在全局库中生成',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.$message.success("操作成功！")
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
          label: '字段名称',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'type',
          label: '字段类型',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'length',
          label: '长度',
          rules: {required: true, trigger: 'change'}
        },
      ],
      tableData2: [
        {
          prop: 'name',
          label: '表名',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'datasource',
          label: '数据源',
          rules: {required: true, trigger: 'change'}
        },
      ]
    }
  }, methods: {
    save() {
      this.visible2 = false;
    },
    getaaa() {
      var s = [{
        name: "t_student",
        datasource: '测试库1',
      }, {
        name: "t_demo",
        datasource: '测试库1',
      }, {
        name: "t_test",
        datasource: '测试库2',
      }]
      // alert(1)
      console.log(window.$flag)
      if (window.$flag) {
        s.push({
          name: "t_teacher",
          datasource: '测试库1',
        },)
      }
      return {dataList: s, total: 4};
    },
    getaaa2() {
      var s = [{
        name: "id",
        type: 'varchar',
        length: '32'
      }, {
        name: "name",
        type: 'varchar',
        length: '50'
      }, {
        name: "sex",
        type: 'int',
        length: '1'
      }, {
        name: "birthday",
        type: 'date',
        length: ''
      }]
      return {dataList: s, total: 1};
    }
  }
}
</script>
