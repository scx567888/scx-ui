<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
export default {
  name: 'TeacherManage',
  data() {
    return {
      tableConfig: {
        modelName: 'TeacherManage',
        module: 'bole',
        labelWidth: '200px',
        dialogWidth: '70%',
      },
      tableData: [
        {
          prop: 'headPortrait', width: '100px', type: "upload", inline:true,
          rules: {trigger: 'change'}
        },
        {
          prop: 'teacherName', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'age', width: '100px',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'teachingYears', width: '100px',
          rules: {required: true, trigger: 'change'}
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
          prop: 'teacherOrderBy', width: '100px',
          defaultValue: 0,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'thisStatus',
          width: '100px',
          type: 'select',
          option: ['启用', '停用'],
          placeholder: '状态',
          defaultValue: '启用'
        },
      ]
    }
  }
}
</script>
