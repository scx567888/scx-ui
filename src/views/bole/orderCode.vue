<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
export default {
  name: 'OrderCodeManage',
  data() {
    return {
      tableConfig: {
        modelName: 'OrderCodeManage',
        module: 'bole',
        labelWidth: '200px',
        dialogWidth: '70%',
        hasCreateButton: false,
        hasUpdateButton: false,
        hasTableOperation: false,
        hasBatchDelete: false
      },
      tableData: [
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
      ]
    }
  }
}
</script>
