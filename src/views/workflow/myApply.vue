<template>
  <div>
    <scx-crud ref="table" :scx-crud-config="tableConfig" :scx-crud-items="tableData"
              :scx-edit-button-data="editButtonData"/>
    <el-dialog :title="title" :visible.sync="formDialogVisible" width="30%">
      <form-preview v-if="formDialogVisible" :default-temp="form" :form-item-list="jsonData"
                    :form-setting='formSetting'/>
      <span slot="footer" class="dialog-footer">
                <el-button @click="formDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" title="审核" width="60%">
      <el-tabs v-model="active">
        <el-tab-pane label="表单" name="form">
          <div style="height: 400px;overflow: auto">
            <scx-form-preview v-if="dialogVisible" :default-temp="form" :form-item-list="jsonData"
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
      </el-tabs>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
import request from "/@/utils/request";

export default {
  name: 'myApply',
  data() {
    return {
      taskDialogVisible: false,
      formDialogVisible: false,
      dialogVisible: false,
      form: {},
      logData: [],
      active: "form",
      currentRow: {},
      title: "",
      editData: {},
      rules: {
        name: [
          {required: true, message: '请输入名称'},
        ],
        processId: [
          {required: true, message: '请选择流程'},
        ]
      },
      jsonData: {},
      formSetting: {},
      processes: [],
      editButtonData: [{
        label: '查看',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.showAudit(row)
        }
      }, {
        label: '修改',
        color: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.showForm(row)
        },
        isShow: (row) => {
          return row.status === 5;
        }
      }],
      tableConfig: {
        editShow: 'name',
        modelName: 'task',
        module: 'workflow',
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
        {prop: 'status', label: '状态'},
        {prop: 'startTime', label: '创建时间'},
      ],
    }
  },
  methods: {
    save() {
      request.post("/api/workflow/updateTask", {
        data: JSON.stringify(this.editData),
        taskId: this.currentRow.id
      }).then((res) => {
        this.formDialogVisible = false;
        this.$refs.table.getList();
      })
    },
    showAudit(row) {
      this.currentRow = row;
      request.post("/api/workflow/getCurrentNode/" + row.id + "/" + row.processId, {}).then((res) => {
        this.jsonData = JSON.parse(res.form).formDesignFormItemList;
        this.dialogVisible = true;
        if (row.data) {
          this.editData = JSON.parse(row.data);
        }
        this.logData = res.logs;

      });
    },
    showForm(row) {
      this.currentRow = row;
      request.post("/api/workflow/getFormJson/" + row.processId).then((res) => {
        this.processId = row.id;
        this.jsonData = JSON.parse(res.form.configure).formDesignFormItemList;
        this.title = res.form.name;
        if (row.data) {
          this.editData = JSON.parse(row.data);
        }
        this.formDialogVisible = true;
      })
    },
  },
  activated() {
    request.post("/api/workflow/process/list", {}).then((res) => {
      this.processes = res.items
    })
  }
}
</script>
