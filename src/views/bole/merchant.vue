<template>
  <div>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData" :scx-edit-buttons="verifyButton"/>
    <el-dialog
        title="申请认证"
        v-model="dialogVisible"
        width="30%"
    >
      <el-row>
        <el-col :span="24"><el-input type="text" v-model="verifyForm.merchantName"/></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <scx-upload v-model="verifyForm.applyFile" placeholder="ePlaceholder"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="verifyForm.applyText"></el-input></el-col>
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
import {checkPhoneNumber} from "/@/utils/constant/rules";
import {reactive, ref} from "vue";
import request from "../../utils/request";
import {ElMessage} from "element-plus"; // 这里获取电话校验方法
export default {
  name: 'MerchantManage',
  setup() {

    const tableConfig = reactive( {
      modelName: 'MerchantManage',
      module: 'bole',
      labelWidth: '200px',
      dialogWidth: '70%',
      operationWidth: '250px',
    });
    const tableData = ref( [
      {
        prop: 'merchantName', width: '100px', isFilter: true,
        rules: {required: true, trigger: 'change'}
      },
      {
        filterWidth: '200px',
        prop: 'storeType',
        width: '350px',
        isFilter: true,
        type: 'select',
        buildUrl: '/api/storeTypeManage/list',
        labelProp: 'typeName',
        valueProp: 'typeName',
        rules: {trigger: 'change', required: true,}
      },
      {
        prop: 'province',
        tableWidth: '170px',
        //使用 region 会导致 页面卡顿 慎用
        type: 'region',
        placeholder: '选择省市区',
        rules: {required: true, message: '籍贯不能为空', trigger: 'change'}
      },
      {
        prop: 'contacts', width: '100px', isFilter: true,
        rules: {required: true, trigger: 'change'}
      },
      {
        prop: 'phone',
        rules: {required: true, validator: checkPhoneNumber}
      },
      {
        prop: 'approved',
        width: '100px',
        type: 'select',
        labelProp:'label',
        valueProp:'value',
        option: [{value: 1, label: '是'}, {value: 0, label: '否'}],
        placeholder: '是否认证',
        defaultValue: 0,
        showFlag: []
      },
      {
        prop: 'highQuality',
        width: '100px',
        type: 'select',
        labelProp:'label',
        valueProp:'value',
        option: [{value: 1, label: '是'}, {value: 0, label: '否'}],
        placeholder: '是否为优质商户',
        defaultValue: 0,
        showFlag: []
      },
      {
        prop: 'license', width: '100px', type: 'upload',inline: true,showFlag: []
      },
      {
        prop: 'typeImage', width: '100px', type: 'upload',inline: true,
      },
      {
        prop: 'banner', width: '100px', type: 'upload',inline: true,noShowInTable: true,
      },
      {
        prop: 'address', maxlength: 1000, width: '200px',
        showOverflowTooltip: true,//todo
        type: 'textarea',
        inline: true,
        rules: {required: true}
      },
      {
        prop: 'remakes', maxlength: 1000, width: '200px',
        showOverflowTooltip: true,
        inline: true,
        type: 'textarea',
        noShowInTable: true,
      },
      {
        prop: 'createDate', width: '100px', isFilter: true, tableWidth: "200px",
        showFlag: []
      },
      {
        prop: 'thisStatus',
        width: '100px',
        type: 'select',
        valueProp:'value',
        labelProp:'label',
        option: [{value: 1, label: '启用'}, {value: 0, label: '停用'}],
        placeholder: '状态',
        inline: true,
        rules: {required: true, trigger: 'change'}
      },
      {
        prop: 'thisOrderBy', width: '100px', defaultValue: 0,
        rules: {required: true, trigger: 'change'}
      },
    ]);

    const dialogVisible = ref(false);

    const verifyForm = reactive({
      merchantName:'',
      applyText:'',
      applyFile:'',
      applyStatus:'2',
      merchantId:0,
    });

    const verifyButton = ref([//表格内列编辑按钮的数据
      {
        prop: '认证审核',
        label: "认证审核",
        colorType: 'primary',
        isShow: (o) => {
          return o.approved!='1' || o.highQuality != '1';
        },
        callback: (row) => {
          openBox(row.id,row.merchantName);
        }
      }]);

    const openBox = (id,merchantName) => {
      dialogVisible.value = true;
      getVerify(id,merchantName);
    }
    const closeBox = () => {
      dialogVisible.value = false;
      clearForm();
    }

    const submitForm = () =>{
      submitData();
    };

    const getVerify = (id,merchantName) =>{
      verifyForm.merchantName = merchantName;
      verifyForm.merchantId = id;
    }

    const submitData = () =>{
      request.post('/api/MerchantVerify/addVerify',verifyForm).then(response => {
        if(response.code === 20){
          ElMessage.success('提交成功!');
          dialogVisible.value = false;
          clearForm();
        } else {
          ElMessage.error('系统错误，请稍后重试!');
        }
      })
    }

    const clearForm = () =>{
      verifyForm.merchantName = '';
      verifyForm.applyText ='';
      verifyForm.applyFile ='';
      verifyForm.merchantId =0;
    }

    return {
      tableConfig,
      tableData,
      verifyForm,
      verifyButton,
      dialogVisible,
      closeBox,
      openBox,
      submitForm,
    }
  }
}
</script>
