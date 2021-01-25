<template>
  <div>
    <scx-crud :scx-crud-config="tableConfig" :scx-edit-button-data="editButton" :scx-table-data="tableData2"
              :simulate-data="getaaa()"/>
    <el-dialog :visible.sync="visible" title="表结构管理">
      <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData" :simulate-data="getaaa2()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible2" title="在业务库中生成">
      请选择业务库
      <el-select v-model="value">
        <el-option label="测试库1" value="2"></el-option>
        <el-option label="测试库2" value="3"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确定</el-button>
      </div>
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
        label: '在业务库中生成',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.visible2 = true;
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
          label: '备注',
          rules: {required: true, trigger: 'change'}
        },
      ]
    }
  }, methods: {
    save() {
      window.$flag = true;
      this.visible2 = false;
      this.$message.success("操作成功！")
    },
    getaaa() {
      var s = [{
        name: "t_teacher",
        datasource: '',
      }, {
        name: "t_demo",
        datasource: '',
      }, {
        name: "t_test",
        datasource: '',
      }]
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
