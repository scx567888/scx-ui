<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
import {checkPhoneNumber} from "/@/utils/constant/rules";
import {reactive} from "vue";

export default {
  name: 'ActivityManage',
  setup() {
    const tableConfig = reactive({
      modelName: 'ActivityManage',
      module: 'bole',
      labelWidth: '200px',
      dialogWidth: '70%',
    });

    const tableData = reactive([
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
        prop: 'activityOrderBy', width: '100px',
        defaultValue: 0,
        rules: {required: true, trigger: 'change'}
      },
      {
        prop: 'thisStatus',
        width: '100px',
        type: 'select',
        option: [{value:1, label: '启用'}, {value:0, label: '停用'}],
        placeholder: '状态',
        valueProp:'value',
        labelProp:'label',
        rules: {required: true, trigger: 'change'}
      },
      {
        prop: 'typeImg', width: '100px', inline: true,type: 'upload',
        rules: {required: true, trigger: 'change'}
      },
      {
        prop: 'banner', width: '100px',inline: true,type: 'upload',noShowInTable: true,
        rules: {required: true, trigger: 'change'}
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
    ]);
    return {tableConfig, tableData}
  }
}
</script>
