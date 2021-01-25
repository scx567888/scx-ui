<template>
  <div>
    <scx-crud :scx-crud-config="tableConfig" :scx-edit-button-data="editButton" :scx-table-data="tableData"
              :simulate-data="getaaa()"/>
    <el-dialog :visible.sync="visible" title="分配用户">
      <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData2" :simulate-data="getaaa2()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible2" title="分配用户">
      <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData3" :simulate-data="getaaa3()"/>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'shujubianji',
  data() {
    return {
      editButton: [{
        label: '分配用户',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.visible = true;
        }
      }, {
        label: '分配接口',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.visible2 = true;
        }
      }],
      visible: false,
      visible2: false,
      tableConfig: {
        modelName: 'shujubianji',
        editShow: 'name',
        tableScrollBarHeight: null,
        dialogWidth: '900px',
        labelWidth: '150px',
        operationWidth: '380px',
        appendToBody: true
      },
      tableData: [
        {
          prop: 'id',
          label: '厂商名称',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'a',
          label: '备注',
          rules: {required: true, trigger: 'change'}
        }
      ],
      tableData2: [
        {
          prop: 'id',
          label: '用户名称',
          rules: {required: true, trigger: 'change'}
        },
      ],
      tableData3: [
        {
          prop: 'id',
          label: '分配接口',
          rules: {required: true, trigger: 'change'}
        },
      ]
    }
  }, methods: {
    getaaa() {
      var s = [{
        id: "测试",
        a: '',
      }, {
        id: "测试厂商",
        a: '',
      }, {
        id: "厂商测试",
        a: '',
      },]
      return {dataList: s, total: 3};
    },
    getaaa2() {
      var s = [{
        id: "测试用户",
        type: '测试用户',
        length: '32'
      }, {
        id: "系统管理员",
        type: 'varchar',
        length: '50'
      }]
      return {dataList: s, total: 1};
    },
    getaaa3() {
      var s = [{
        id: "测试接口",
        type: '测试用户',
        length: '32'
      }, {
        id: "测试接口List",
        type: 'varchar',
        length: '50'
      }]
      return {dataList: s, total: 1};
    }
  }
}
</script>
