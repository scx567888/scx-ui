<template>
  <scx-crud ref="crudRef" :scx-crud-config="tableConfig" :scx-crud-items="tableData" :scx-edit-buttons="checkButton"/>
</template>

<script>
import {ref, reactive} from "vue";
import request from "../../utils/request";
import {ElMessage} from "element-plus"; // 这里获取电话校验方法
export default {
  name: 'OrderCodeManage',
  setup() {

    const crudRef = ref(null);

    const tableConfig = reactive({
          modelName: 'OrderCodeManage',
          module: 'bole',
          labelWidth: '200px',
          dialogWidth: '70%',
          hasCreateButton: false,
          hasUpdateButton: false,
          hasBatchDelete: false,
          hasDeleteButton: false,
    });
    const tableData = ref([
      {
        prop: 'orderCode', width: '100px', isFilter: true,
        showFlag: []
      },
      {
        prop: 'merchantId',
        width: '350px',
        isFilter: true,
        type: 'select',
        buildUrl: '/api/MerchantManage/list',
        labelProp: 'merchantName',
        valueProp: 'id',
        showFlag: []
      },
      {
        prop: 'courseId',
        width: '350px',
        isFilter: true,
        type: 'select',
        buildUrl: '/api/CourseManage/list',
        labelProp: 'courseName',
        valueProp: 'id',
        showFlag: []
      },
      {
        prop: 'activityId',
        width: '350px',
        isFilter: true,
        type: 'select',
        buildUrl: '/api/ActivityManage/list',
        labelProp: 'activityName',
        valueProp: 'id',
        showFlag: []
      },
      {
        prop: 'userAccount', width: '100px', isFilter: true,
        showFlag: []
      },
      {
        prop: 'payInfo', width: '100px',
        showFlag: []
      },
      {
        prop: 'thisStatus',
        width: '100px',
        type: 'select',
        valueProp:'value',
        labelProp:'label',
        //订单状态(0:已退款，1:已付款，2:待付款，3:已消费，4:申请退款中，5:退款中)
        option: [{value: 0, label: '已退款'}, {value: 1, label: '已付款'}, {value: 2, label: '待付款'}, {value: 3, label: '已消费'}, {value: 4, label: '申请退款中'}, {value: 5, label: '退款中'}],
        placeholder: '状态',
        isFilter: true,
        inline: true,
        rules: {required: true, trigger: 'change'}
      },
    ]);

    const checkButton = ref([//表格内列编辑按钮的数据
      {
        prop: '确认使用',
        label: "确认使用",
        colorType: 'primary',
        isShow: (o) => {
          return o.thisStatus=='1'
        },
        callback: (row) => {
          checkOrderCode(row);
        }
      }]);

    const checkOrderCode = (row) => {
      request.post("/api/OrderCodeManage/use",{id:row.id}).then(data =>{
        if(data.code==20){
          ElMessage.success('操作成功!');
          crudRef.value.getList();
        } else {
          ElMessage.error('操作失败!');
        }
      })
    }

    return {
      tableConfig,
      tableData,
      checkButton,
      crudRef,
    }
  }
}
</script>
