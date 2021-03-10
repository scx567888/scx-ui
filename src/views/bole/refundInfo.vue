<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
export default {
  name: 'RefundInfo',
  data() {
    return {
      tableConfig: {
        modelName: 'RefundInfo',
        module: 'bole',
        labelWidth: '200px',
        dialogWidth: '70%',
        hasCreateButton:false,
        hasUpdateButton:false,
        hasBatchDelete: false,
        hasDeleteButton: false,
        hasOperation:false
      },
      tableData: [
        {
          prop: 'orderCode', width: '100px', isFilter: true,
        },
        {
          filterWidth: '200px',
          prop: 'merchantId',
          width: '350px',
          isFilter: true,
          type: 'select',
          buildUrl: '/api/MerchantManage/list',
          labelProp: 'merchantName',
          valueProp: 'id',
          rules: {trigger: 'change', required: true,}
        },
        {
          filterWidth: '200px',
          prop: 'userAccount',
          width: '350px',
          isFilter: true,
          type: 'select',
          buildUrl: '/api/User/list',
          labelProp: 'username',
          valueProp: 'username',
          tableLabelFormat: (o) => o.nickName+"("+o.username+")",
          rules: {trigger: 'change', required: true,}
        },
        {
          prop: 'refundInfo', width: '100px',
        },
        {
          prop: 'createDate', width: '100px',
        },
      ]
    }
  }
}
</script>
