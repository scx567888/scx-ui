<template>
  <scx-table :scxTableConfig="tableConfig" :tableData="tableData"/>
</template>

<script>


export default {
  name: 'shouwendengji',
  data() {
    return {
      tableConfig: {
        modelName: 'LaiWenLeiXing',//此处表示 页面 的国际化之类的
        editShow: 'name',
        labelWidth: '200px',
        dialogWidth: '90%',
        hasBatchDelete: false,
        hasPagination: false,
        hasRightClickMenu: false,
        hasShortcutKeys: false,
        hasMultiSelectButton: false,
      },
      tableData: [
        {
          label: '来文类型名称',
          prop: 'name',
          isFilter:true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '所属类别',
          prop: 'laiWenLeiXingLeiBeiId',
          type:'selectByUrl',
          selectByUrl:'/api/laiWenLeiXingLeiBei/list',
          selectByUrlLabel: 'name',
          selectByUrlValue: 'id',
          isFilter:true,
          rules: {required: true, trigger: 'blur',}
        }
      ],
    }
  }
}
</script>

