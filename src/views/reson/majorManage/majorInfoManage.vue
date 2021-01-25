<template>
  <scx-crud
      :scx-crud-config="scxTableConfig"
      :scx-left-tree-config="leftTreeConfig"
      :scx-left-tree-data="leftTreeData"
      :scx-table-data="tableData"
  />
</template>
<script>

export default {
  name: 'majorInfoManage',
  data() {
    return {
      scxTableConfig: {
        //右侧 的 model 名称
        modelName: 'MajorManage',
        editShow: 'majorName',
        tableType: 'leftTreeAndTable'
      },
      leftTreeConfig: {
        buildUrl: '/api/PasternManage/list',
        topLabel: '系部',
        modelName: 'PasternManage',
        editName: 'pasternCode',
        editShow: 'pasternName',
        labelFun: (o) => o.pasternName + ' (' + o.pasternCode + ')',
        onClick: this.leftTreeOnClick
      },
      //左侧树 crud 的 model
      leftTreeData: [
        {
          prop: 'pasternName', width: '150px',
          rules: {trigger: 'change', required: true}
        },
        {
          prop: 'pasternCode',
          width: '150px',
          rules: {trigger: 'blur', required: true, isUnique: true}
        },
        {
          prop: 'pasternOrderBy', type: 'number', width: '150px', defaultValue: 0,
          rules: {trigger: 'change', required: true,}
        },
      ],
      tableData: [
        {
          prop: 'majorName',
          width: '150px',
          isFilter: true,
          rules: {trigger: 'change', required: true,}
        },
        {
          prop: 'pasternCode',
          width: '180px',
          filterWidth: '150px',
          type: 'select',
          buildUrl: '/api/PasternManage/list',
          labelProp: 'pasternName',
          valueProp: 'pasternCode',
          isFilter: true,
          tableLabelFormat: (o) => o.pasternName + '(' + o.pasternCode + ')',
          filterLabelFormat: (o) => o.pasternName + '(' + o.pasternCode + ')',
          rules: {trigger: 'change', required: true,}
        },
        {
          prop: 'majorCode', width: '150px', isFilter: true,
          rules: {trigger: 'blur', required: true, isUnique: true}
        },
        {
          prop: 'majorOrderBy', type: 'number', defaultValue: 0,
          rules: {trigger: 'change', required: true,}
        }]
    }
  },
  methods: {
    leftTreeOnClick(nowNodeData, listQuery) {
      listQuery.pasternCode = nowNodeData.pasternCode
      listQuery.page = 1
      return listQuery
    }
  }
}
</script>
