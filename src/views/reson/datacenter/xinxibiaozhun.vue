<template>
  <div>
    <scx-crud :scx-crud-config="tableConfig" :scx-edit-button-data="editButton" :scx-table-data="tableData"
              :simulate-data="getaaa()"/>
    <el-dialog :visible.sync="visible" title="标准监控">
      <scx-crud :scx-crud-config="tableConfig2" :scx-table-data="tableData2" :simulate-data="getaaa2()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible2" title="权限管理">
      <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData3" :simulate-data="getaaa3()"/>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'shujubianji',
  data() {
    return {
      visible: false,
      visible2: false,
      editButton: [{
        label: '标准监控',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.visible = true;
        }
      }, {
        label: '授权',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.visible2 = true;
        }
      }],
      tableConfig: {
        modelName: 'shujubianji',
        editShow: 'name',
        tableScrollBarHeight: null,
        dialogWidth: '900px',
        labelWidth: '150px',
        operationWidth: '380px',
        hasExcelDownloadNowDisabled: false,
        hasExcelDownloadNowFilterDisabled: false,
        hasExcelDownloadAllDisabled: false,
        appendToBody: true,
      }, tableConfig2: {
        modelName: 'shujubianji',
        editShow: 'name',
        tableScrollBarHeight: null,
        dialogWidth: '900px',
        labelWidth: '150px',
        operationWidth: '380px',
        appendToBody: true,
        hasCreateButton: false,
        hasUpdateButton: false,
        hasDeleteButton: false,
        hasBatchDelete: false,
        hasExcelDownloadNowDisabled: false,
        hasExcelDownloadNowFilterDisabled: false,
        hasExcelDownloadAllDisabled: false,
        hasQueryOperation: false
      },
      tableData: [
        {
          prop: 'id',
          label: '标准名称',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'c',
          label: '编码',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'a',
          label: '类型',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'b',
          label: '长度',
          rules: {required: true, trigger: 'change'}
        }
      ], tableData2: [
        {
          prop: 'id',
          label: '标准访问量',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'b',
          label: '标准搜索数',
          rules: {required: true, trigger: 'change'}
        }, {
          prop: 'a',
          label: '查看规范数',
          rules: {required: true, trigger: 'change'}
        }
      ], tableData3: [
        {
          prop: 'id',
          label: '用户类型',
          rules: {required: true, trigger: 'change'}
        }
      ],
    }
  }, methods: {
    getaaa() {
      var s = [{
        id: "身份证号",
        a: 'varchar',
        b: "18",
        c: 'sfzh',
      }, {
        id: "性别",
        a: 'int',
        b: "1",
        c: 'xb',
      }, {
        id: "年龄",
        a: 'int',
        b: "3",
        c: 'nl',
      },]
      return {dataList: s, total: 3};
    },
    getaaa2() {
      var s = [{
        id: "22",
        a: '33',
        b: "55",
      }]
      return {dataList: s, total: 3};
    },
    getaaa3() {
      var s = [{
        id: "管理员",
        a: '33',
        b: "55",
      }, {
        id: "学生",
        a: '33',
        b: "55",
      }]
      return {dataList: s, total: 3};
    }
  }
}
</script>
