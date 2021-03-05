<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
import {checkPhoneNumber} from "/@/utils/constant/rules"; // 这里获取电话校验方法
export default {
  name: 'SubjectManage',
  data() {
    return {
      tableConfig: {
        modelName: 'SubjectManage',
        module: 'bole',
        labelWidth: '200px',
        dialogWidth: '70%',
      },
      tableData: [
        {
          prop: 'subjectName', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'subjectCode', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'thisStatus',
          width: '100px',
          type: 'select',
          valueProp:'value',
          labelProp:'label',
          option: [{value: 1, label: '启用'}, {value: 0, label: '停用'}],
          placeholder: '状态',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'thisOrderBy', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
      ]
    }
  }
}
</script>
