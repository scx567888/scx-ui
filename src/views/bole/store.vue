<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
import {checkPhoneNumber} from "../../utils/constant/rules"; // 这里获取电话校验方法
export default {
  name: 'StoreManage',
  data() {
    return {
      tableConfig: {
        modelName: 'StoreManage',
        module: 'bole',
        labelWidth: '200px',
        dialogWidth: '70%',
      },
      tableData: [
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
          prop: 'storeName', width: '100px', isFilter: true,
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
          prop: 'storeType',
          width: '100px',
          type: 'select',
          option: ['学前教育', '其他'],
          placeholder: '门店类型',
          defaultValue: '学前教育'
        },
        {
          prop: 'businessStatus',
          width: '100px',
          type: 'select',
          option: ['营业中', '歇业中', '停业中'],
          placeholder: '营业状态',
          defaultValue: '营业中',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'businessStartTime', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'businessEndTime', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'approved',
          width: '100px',
          type: 'select',
          option: [{color: 'green', label: '是'}, {color: 'red', label: '否'}],
          placeholder: '是否认证',
          defaultValue: '否',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'address', maxlength: 1000, width: '200px',
          showOverflowTooltip: true,
          inline: true,
          type: 'textarea',
          rules: {required: true}
        },
        {
          prop: 'remakes', maxlength: 1000, width: '200px',
          showOverflowTooltip: true,
          type: 'textarea',
          inline: true,
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
          option: [{color: 'green', label: '启用'}, {color: 'red', label: '停用'}],
          placeholder: '状态',
          defaultValue: '启用'
        },
      ]
    }
  }
}
</script>
