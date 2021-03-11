<template>
  <scx-table :scxTableConfig="tableConfig" :tableData="tableData"/>
</template>

<script>
export default {
  name: 'fawendengji',
  data() {
    return {
      tableConfig: {
        modelName: 'FaWenDengJi',//此处表示 页面 的国际化之类的
        editShow: 'wenjianbiaoti',
        labelWidth: '200px',
        dialogWidth: '90%',
        hasExcelDownloadTemplateButton: false,
        //在添加按钮中 是否有 Excel 导入功能
        hasExcelImport: false,
      },
      tableData: [
        {
          label:'顺序号',
          prop: 'id', isFilter: true, maxlength: 10,
          showFlag: [''],
          width: '100px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label:'移民局发文字号',
          prop: 'yiMinJuFaWenZiHao', isFilter: true,
          width: '150px'
        }, {
        label:'要情信息发文字号',
          prop: 'yaoQingXinXiFaWenZiHao', isFilter: true,
          width: '190px',
        },
        {
          label:'发文类型',
          prop: 'faWenLeiXing', isFilter: true,
          width: '120px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'faWenRiQi', isFilter: true,
          label: '发文日期',
          width: '150px',
          type: 'date-picker',
          filterWidth: '320px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label:'发文方式',
          prop: 'faWenFangShi', isFilter: true,
          width: '120px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label:'报送范围',
          prop: 'baoSongFanWei', isFilter: true,
          width: '120px',
          rules: {required: true, trigger: 'blur',}
        },
        {label:'采用单位',
          prop: 'caiYongDanWei', isFilter: true, maxlength: 50,
          width: '120px',
        },
        {
          label:'采用期数',
          prop: 'caiYongQiShu',
          width: '120px',
          type: 'input-number'
        },
        {
          label:'文件标题',
          prop: 'wenJianBiaoTi', isFilter: true, maxlength: 500,
          showOverflowTooltip: true,
          width: '120px',
          aaa: true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          label:'资料来源',
          prop: 'ziLiaoLaiYuan', isFilter: true, maxlength: 1000,
          width: '200px',
          showOverflowTooltip: true,
          type: 'textarea',
        },
        {
          label:'文件份数',
          prop: 'wenJianFenShu',
          width: '120px',
          type: 'input-number',
        },
        {
          label:'原文编号',
          prop: 'yuanWenBianHao', isFilter: true, maxlength: 500,
          width: '200px',
          showOverflowTooltip: true,
          type: 'textarea',
        },
        {
          label:'编辑人',
          prop: 'bianJiRen', isFilter: true, maxlength: 200,
          width: '100px',
          showOverflowTooltip: true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          label:'签发人',
          prop: 'qianFaRen', isFilter: true, maxlength: 200,
          width: '100px',
          showOverflowTooltip: true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          label:'批示内容',
          prop: 'piShiNeiRong', isFilter: true, maxlength: 1000,
          width: '120px',
          showOverflowTooltip: true,
          type: 'textarea',
        },
        {label:'备注',
          prop: 'beiZhu', isFilter: true, maxlength: 500,
          width: '100px',
          showOverflowTooltip: true,
          type: 'textarea',
        },

      ]
    }
  }
}
</script>

