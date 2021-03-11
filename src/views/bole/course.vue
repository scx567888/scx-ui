<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
export default {
  name: 'CourseManage',
  data() {
    return {
      tableConfig: {
        modelName: 'CourseManage',
        module: 'bole',
        labelWidth: '200px',
        dialogWidth: '70%',
      },
      tableData: [
        {
          prop: 'courseName', width: '100px', isFilter: true,
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
          prop: 'teacherId',
          width: '350px',
          isFilter: true,
          type: 'select',
          buildUrl: '/api/teacherManage/list',
          labelProp: 'teacherName',
          valueProp: 'id',
          rules: {trigger: 'change', required: true,}
        },
        {
          filterWidth: '200px',
          prop: 'subject',
          width: '350px',
          isFilter: true,
          type: 'select',
          buildUrl: '/api/SubjectManage/list',
          labelProp: 'subjectName',
          valueProp: 'subjectName',
          rules: {trigger: 'change', required: true,}
        },
        {
          prop: 'age', width: '100px',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'classTime', width: '100px',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'takeTime', width: '100px',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'classType', width: '100px',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'courseOrderBy', width: '100px',
          defaultValue: 0,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'thisStatus',
          width: '100px',
          type: 'select',
          option: [{label: '启用',value:1}, {label: '停用',value:0}],
          placeholder: '状态',
          valueProp:'value',
          labelProp:'label',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'typeImg', width: '100px', inline: true,type: 'upload',
        },
        {
          prop: 'banner', width: '100px',inline: true,type: 'upload',noShowInTable: true,
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
