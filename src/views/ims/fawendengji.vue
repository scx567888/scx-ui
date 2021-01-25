<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
export default {
  name: 'fawendengji',
  data() {
    return {
      tableConfig: {
        modelName: 'Fawendengji',//此处表示 页面 的国际化之类的
        editShow: 'wenjianbiaoti',
        module: 'ims',
        labelWidth: '200px',
        dialogWidth: '90%',
        hasExcelDownloadTemplateButton: false,
        //在添加按钮中 是否有 Excel 导入功能
        hasExcelImport: false,
      },
      tableData: [
        {
          prop: 'id', isFilter: true, maxlength: 10,
          showFlag: [''],
          width: '100px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'yiminjufawenzihao', isFilter: true,
          width: '150px',
          rules: {required: true, trigger: 'blur',}
        }, {
          prop: 'yaoqingxinxifawenzihao', isFilter: true,
          width: '190px',
        },
        {
          prop: 'fawenleixing', isFilter: true,
          width: '120px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'fawenriqi', isFilter: true,
          label: '发文日期',
          width: '150px',
          type: 'date',
          filterWidth: '320px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'fawenfangshi', isFilter: true,
          width: '120px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'basosongfanwei', isFilter: true,
          width: '120px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'caiyongdanwei', isFilter: true, maxlength: 50,
          width: '120px',
        },
        {
          prop: 'caiyongqishu',
          width: '120px',
          type: 'number'
        },
        {
          prop: 'wenjianbiaoti', isFilter: true, maxlength: 500,
          showOverflowTooltip: true,
          width: '120px',
          aaa: true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'ziliaolaiyuan', isFilter: true, maxlength: 1000,
          width: '200px',
          showOverflowTooltip: true,
          type: 'textarea',
        },
        {
          prop: 'wenjianfenshu',
          width: '120px',
          type: 'number',
        },
        {
          prop: 'yuanwenbianhao', isFilter: true, maxlength: 500,
          width: '200px',
          showOverflowTooltip: true,
          type: 'textarea',
        },
        {
          prop: 'bianjiren', isFilter: true, maxlength: 200,
          width: '100px',
          showOverflowTooltip: true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'qianfaren', isFilter: true, maxlength: 200,
          width: '100px',
          showOverflowTooltip: true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'pishineirong', isFilter: true, maxlength: 1000,
          width: '120px',
          showOverflowTooltip: true,
          type: 'textarea',
        },
        {
          prop: 'beizhu', isFilter: true, maxlength: 500,
          width: '100px',
          showOverflowTooltip: true,
          type: 'textarea',
        },

      ]
    }
  }
}
</script>

