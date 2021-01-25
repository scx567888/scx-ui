<template>
  <div>
    <scx-crud ref="table" :scx-crud-config="tableConfig" :scx-crud-items="tableData"
              :scx-edit-buttons="editButtonData"/>

    <el-dialog :title="title" :visible.sync="formDialogVisible" width="30%">
      <scx-form-preview v-if="formDialogVisible" :default-temp="formDesignTemp" :form-item-list="formItemList"
                        :form-setting='formSetting'/>
      <span slot="footer" class="dialog-footer">
                <el-button @click="formDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveForm()">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
import request from "/@/utils/request";

export default {
  name: 'processApply',
  data() {
    return {
      formDesignFormSetting: {labelWidth: 80},
      formDesignFormItemList: [],
      taskDialogVisible: false,
      formDialogVisible: false,
      title: "",
      processId: null,
      formItemList: [],
      formSetting: {
        labelPosition: 'left',
        labelWidth: 80,
        formSize: 'small'
      },
      formDesignTemp: {},
      processes: [],
      hasScroll: false,
      tableConfig: {
        editShow: 'name',
        modelName: 'process',
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
      ],
      editButtonData: [
        {
          label: '申请',
          colorType: 'success',
          doSomeThing: (row) => this.showForm(row),
        },
      ]
    }
  },
  methods: {
    showForm(row) {
      request.post("/api/workflow/getFormJson/" + row.id).then((res) => {
        this.processId = row.id;
        this.formItemList = JSON.parse(res.form.configure).formDesignFormItemList;
        //this.title = res.form.name;
        this.formDialogVisible = true;
      })
    },
    saveForm() {
      request.post("/api/task", {
        data: JSON.stringify(this.formDesignTemp),
        processId: this.processId
      }).then((res) => {
        this.processes = res.items;
        this.formDialogVisible = false;
        this.$router.push({path: "/workflow/my-apply"})
      })
    },
  },
}
</script>
