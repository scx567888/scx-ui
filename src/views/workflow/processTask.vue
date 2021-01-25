<template>
  <div>
    <scx-crud ref="table" :scx-crud-config="tableConfig" :scx-crud-items="tableData"
              :scx-edit-button-data="editButtonData"/>
    <el-dialog :visible.sync="dialogVisible" title="查看" width="60%">
      <el-tabs v-model="active">
        <el-tab-pane label="表单" name="form">
          <div style="height: 400px;overflow: auto">
            <scx-form-preview v-if="dialogVisible" :default-temp="editData" :form-item-list="jsonData"
                              :form-setting='formSetting'/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流程日志" name="log">
          <div style="height: 400px;overflow: auto">
            <el-table :data="logData" style="width: 100%">
              <el-table-column label="节点名称" prop="nodeName" width="180">
              </el-table-column>
              <el-table-column label="操作名称" prop="operateName" width="180">
              </el-table-column>
              <el-table-column label="操作人" prop="operatorName">
              </el-table-column>
              <el-table-column label="操作时间" prop="createTime">
              </el-table-column>
              <el-table-column label="操作类型" prop="status">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核" name="audit">
          <div style="height: 400px;overflow: auto">
            <scx-form-preview v-if="currentFrom" :default-temp="formData" :form-item-list="currentFrom"
                              :form-setting='formSetting'/>
            <el-form label-position="right" label-width="100px">
              <el-form-item label="意见:">
                <el-input v-model="remark" placeholder="请填写意见"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="audit(5)">驳 回</el-button>
                <el-button type="primary" @click="audit(4)">通 过</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
import request from "/@/utils/request";

export default {
  name: 'processTask',
  data() {
    return {
      formData: {},
      formSetting: {},
      logData: [],
      active: 'form',
      dialogVisible: false,
      form: {},
      remark: "",
      title: "",
      editData: {},
      jsonData: {},
      currentFrom: null,
      currentRow: {},
      rules: {
        name: [
          {required: true, message: '请输入名称'},
        ],
        processId: [
          {required: true, message: '请选择流程'},
        ]
      },
      processes: [],
      tableConfig: {
        editShow: 'name',
        modelName: 'task',
        listApi: "/api/workflow/task/list",
        operationWidth: '380px',
        hasCreateButton: false,
        hasUpdateButton: false,
        hasDeleteButton: false,
        hasBatchDelete: false,
        hasExcelDownloadNowDisabled: false,//在添加按钮中 是否有 Excel 下载当前页面功能 //添加按钮的下拉选配置 注意!!! 若全部为 false 则 添加按钮会由下拉框按钮变为 普通的按钮
        hasExcelDownloadNowFilterDisabled: false, //在添加按钮中 是否有 Excel 下载过滤条件功能
        hasExcelDownloadAllDisabled: false,//在添加按钮中 是否有 Excel 全部导出
      },
      tableData: [
        {prop: 'name', label: '名称'},
        {prop: 'processName', label: '流程名称'},
        {prop: 'creator', label: '申请人'},
        {prop: 'startTime', label: '创建时间'},
        {prop: 'status', label: '状态'},
      ],
      editButtonData: [
        {
          prop: 'shenhe',
          label: '审核',
          color: 'success',
          doSomeThing: (row) => this.showAudit(row),
          isShow: (row) => row.status !== 6
        },
      ]
    }
  },
  methods: {
    showAudit(row) {
      this.currentRow = row;
      request.post("/api/workflow/getCurrentNode/" + row.id + "/13", {}).then((res) => {
        this.jsonData = JSON.parse(res.form).formDesignFormItemList;
        console.log(this.jsonData)
        this.currentFrom = JSON.parse(res.currentNode.form).formDesignFormItemList;
        console.log(this.currentFrom)
        this.dialogVisible = true;
        if (row.data) {
          this.editData = JSON.parse(row.data);
        }
        this.logData = res.logs;
      });
    },
    audit(status) {
      request.post("/api/workflow/audit/" + this.currentRow.id, {
        data: JSON.stringify(this.formData),
        remark: this.remark,
        status: status,
      }).then((res) => {
        this.dialogVisible = false;
        this.$refs.table.getList();
      });
    }
  },
}
</script>
