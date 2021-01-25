<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
import {checkPhoneNumber} from "../../../utils/constant/rules";

export default {
  name: 'ActivityManage',
  data() {
    return {
      tableConfig: {
        modelName: 'ActivityManage',
        module: 'bole',
        labelWidth: '200px',
        dialogWidth: '70%',
      },
      tableData: [
        {
          prop: 'activityName', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'originalPrice', width: '100px',
        },
        {
          prop: 'price', width: '100px',
          rules: {required: true, trigger: 'change'}
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
          prop: 'typeImg', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'banner', width: '100px',
          rules: {required: true, trigger: 'change'}
        },
        {
          filterWidth: '200px',
          prop: 'merchantId',
          width: '350px',
          isFilter: true,
          type: 'select',
          buildUrl: '/api/bole/MerchantManage/list',
          labelProp: 'merchantName',
          valueProp: 'id',
          rules: {trigger: 'change', required: true,}
        },
        {
          filterWidth: '200px',
          prop: 'storeId',
          width: '350px',
          isFilter: true,
          type: 'select',
          buildUrl: '/api/bole/StoreManage/list',
          labelProp: 'storeName',
          valueProp: 'id',
          rules: {trigger: 'change', required: true,}
        },
        {
          filterWidth: '200px',
          prop: 'teacherAccount',
          width: '350px',
          isFilter: true,
          type: 'select',
          buildUrl: '/api/bole/teacherManage/list',
          labelProp: 'teacherName',
          valueProp: 'id',
          rules: {trigger: 'change', required: true,}
        },
        {
          prop: 'activityOrderBy', width: '100px',
          defaultValue: 0,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'thisStatus',
          width: '100px',
          type: 'select',
          option: [{color: 'green', label: '启用'}, {color: 'red', label: '停用'}],
          placeholder: '状态',
          defaultValue: '启用'
        },
        {
          prop: 'remarks', maxlength: 1000, width: '200px',
          showOverflowTooltip: true,
          inline: true,
          type: 'tinymce',
          noShowInTable: true,
        },
        {
          prop: 'notice', maxlength: 1000, width: '200px',
          showOverflowTooltip: true,
          inline: true,
          type: 'tinymce',
          noShowInTable: true,
        },
        {
          prop: 'courseText', maxlength: 1000, width: '200px',
          showOverflowTooltip: true,
          inline: true,
          type: 'tinymce',
          noShowInTable: true,
        },
      ]
    }
  }
}
</script>
