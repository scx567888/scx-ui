<template>
  <scx-crud ref="scxRef" :scx-crud-config="tableConfig" :scx-crud-items="tableData" :message-div="verifyButton"/>
</template>

<script>
import {ref, reactive, onMounted, computed, watch} from "vue";
import {state} from "../../store";

export default {
  name: 'OrderCodeManage',
  setup() {
    const scxRef=ref(null);
    const tableConfig =  reactive({
      modelName: 'OrderCodeManage',
          module: 'bole',
          labelWidth: '200px',
          dialogWidth: '70%',
          hasCreateButton: false,
          hasUpdateButton: false,
          hasBatchDelete: false,
          hasDeleteButton: false,
          hasOperation:false,
          hasPagination:false,
          listApi: '/api/OrderCodeManage/statement',
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
        prop: 'merchantIncome', width: '100px',
        showFlag: []
      },
      {
        prop: 'platformIncome', width: '100px',
        showFlag: []
      },
      {
        prop: 'proportion', width: '100px',
        showFlag: []
      },
      {
        prop: 'startTime', width: '100px',noShowInTable:true,isFilter: true,type: "date",
        showFlag: []
      },
    ]);


    const verifyButton = ref('');


    onMounted(()=>{
      watch(() => scxRef.value.crudContext.tableBody, () => {
        let merchantIncome = 0.00;
        let platformIncome = 0.00;
        for(let i = 0; i < scxRef.value.crudContext.tableBody.length; i++){
          platformIncome += scxRef.value.crudContext.tableBody[i].platformIncome;
          merchantIncome += scxRef.value.crudContext.tableBody[i].merchantIncome;
        }
        verifyButton.value= '商户盈利：<span style="color: green">'+merchantIncome+'</span>元 <br> 平台盈利：<span style="color: green">'+platformIncome+'</span>元';
      });
    })

    return {
      tableConfig,
      tableData,
      verifyButton,
      scxRef
    }
  }
}
</script>
