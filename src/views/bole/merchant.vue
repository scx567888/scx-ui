<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
import {checkPhoneNumber} from "/@/utils/constant/rules"; // 这里获取电话校验方法
export default {
  name: 'MerchantManage',
  data() {
    return {
      tableConfig: {
        modelName: 'MerchantManage',
        module: 'bole',
        labelWidth: '200px',
        dialogWidth: '70%',
      },
      tableData: [
        {
          prop: 'merchantName', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
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
          defaultValue: 0
        },
        {
          prop: 'highQuality',
          width: '100px',
          type: 'select',
          labelProp:'label',
          valueProp:'value',
          option: [{value: 1, label: '是'}, {value: 0, label: '否'}],
          placeholder: '是否为优质商户',
          defaultValue: 0
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
          prop: 'createTime', width: '100px', isFilter: true, tableWidth: "200px",
          showFlag: []
        },
        {
          prop: 'thisStatus',
          width: '100px',
          type: 'select',
          labelProp:'label',
          valueProp:'value',
          option: [{value: 0, label: '启用'}, {value: 1, label: '停用'}],
          placeholder: '状态',
          defaultValue: 1
        },
      ]
    }
  }
}
</script>
