<template>
  <div>
    <scx-crud ref="crudRef" :scx-crud-config="tableConfig" :scx-crud-items="tableData" :scx-edit-buttons="verifyButton"/>
    <el-dialog
        title="商户审核"
        v-model="dialogVisible"
        width="30%"
        >
      <el-row>
        <el-col :span="24"><el-input type="text" v-model="verifyInfo.orderCode"/></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><el-input type="text" v-model="verifyInfo.merchantName"/></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><el-image :src="verifyInfo.applyFile"></el-image></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="verifyInfo.applyText" :disabled="true"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div>
            <el-radio-group v-model="verifyInfo.applyStatus">
              <el-radio-button label="1">通过</el-radio-button>
              <el-radio-button label="0">驳回</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="verifyInfo.backText"></el-input></el-col>
      </el-row>
      <template #footer>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="closeBox">取 消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
</style>
<script>
import {ref, reactive} from "vue";
import request from "../../utils/request";
import {ElMessage} from "element-plus"; // 这里获取电话校验方法
export default {

  name: 'RefundVerify',

  setup() {

    const crudRef = ref(null);

    const tableConfig = reactive({
      modelName: 'RefundVerify',
      module: 'bole',
      labelWidth: '200px',
      dialogWidth: '70%',
      operationWidth: '300px',
      hasCreateButton:false,
      hasUpdateButton:false,
      hasBatchDelete: false,
      hasDeleteButton: false
    });
    const tableData = ref([
      {
        prop: 'orderCode', width: '100px', isFilter: true,
        showFlag: []
      },
      {
        filterWidth: '200px',
        prop: 'merchantId',
        width: '350px',
        isFilter: true,
        type: 'select',
        buildUrl: '/api/merchantManage/list',
        labelProp: 'merchantName',
        valueProp: 'id',
        rules: {trigger: 'change', required: true,}
      },
      {
        prop: 'applyStatus',
        width: '100px',
        type: 'select',
        isFilter: true,
        option: [{value: 1, label: '通过'}, {value: 0, label: '驳回'}, {value: 2, label: '待审核'}],
        placeholder: '状态',
        valueProp: 'value',
        labelProp: 'label',
        rules: {required: true, trigger: 'change'}
      },
      {
        prop: 'applyText', maxlength: 1000, width: '200px',
        showOverflowTooltip: true,
        inline: true,
        type: 'textarea',
        noShowInTable: true,
      },
      {
        prop: 'applyFile', width: '100px', type: 'upload', inline: true,noShowInTable: true,
      },
      {
        prop: 'createDate', width: '100px', tableWidth: "200px",
        showFlag: []
      },
      {
        prop: 'checkAccount', width: '100px', tableWidth: "200px",
        showFlag: []
      },
      {
        prop: 'backDate', width: '100px', tableWidth: "200px",
        showFlag: []
      },
    ]);

    const verifyInfo = reactive({
      id:0,
      orderCode:'',
      merchantName:'',
      applyText:'',
      applyFile:'',
      applyStatus:'1',
      merchantId:0,
      backText:'',
    });

    const dialogVisible = ref(false);

    //初始化 右侧操作的按钮数据
    const verifyButton = ref([//表格内列编辑按钮的数据
      {
        prop: '认证审核',
        label: "认证审核",
        colorType: 'primary',
        isShow: (o) => {
          return o.applyStatus=='2'
        },
        callback: (row) => {
          openBox(row);
        }
      }]);

    const openBox = (bean) => {
      dialogVisible.value = true;
      getVerify(bean);
    }
    const closeBox = () => {
      dialogVisible.value = false;
      clearForm();
    }

    const submitForm = () =>{
      submitData();
    };

    const getVerify = (bean) =>{
      if(bean.merchantId){
        request.get('/api/MerchantManage/get?id='+bean.merchantId).then(response => {
          if(response.code===20 && response.items){
            verifyInfo.id = bean.id;
            verifyInfo.orderCode = bean.orderCode;
            verifyInfo.merchantName = response.items.merchantName;
            verifyInfo.merchantId = response.items.id;
            verifyInfo.applyFile = bean.applyFile;
            verifyInfo.applyText = bean.applyText;
          }
        })
      }
    }

    const submitData =()=>{
      request.post('/api/RefundVerify/apply',verifyInfo).then(response => {
            if (response.code === 20) {
              ElMessage.success('操作成功!');
              crudRef.value.getList();
              dialogVisible.value = false;
              clearForm();
            }else {
              ElMessage.error('操作失败!');
            }
          });
    }

    const clearForm =() => {
      verifyInfo.id = 0;
      verifyInfo.merchantName ='';
      verifyInfo.orderCode ='';
      verifyInfo.applyText ='';
      verifyInfo.applyFile ='';
      verifyInfo.applyStatus ='1';
      verifyInfo.merchantId =0;
      verifyInfo.backText ='';
    }

    return {
      verifyInfo,
      dialogVisible,
      tableConfig,
      tableData,
      verifyButton,
      openBox,
      closeBox,
      submitForm,
      crudRef,
    }
  }
}
</script>
