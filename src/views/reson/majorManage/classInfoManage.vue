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
  name: 'classInfoManage',
  data() {
    return {
      scxTableConfig: {
        editShow: 'majorName',
        modelName: 'ClassManage',
        tableType: 'leftTreeAndTable'
      },
      leftTreeConfig: {
        buildUrl: '/api/ClassManage/treeList',
        topLabel: '班级信息维护',
        modelName: 'MajorManage',
        editName: 'majorCode',
        editValue: 'treeValue',
        editShow: 'pasternName',
        showFilterInput: true,
        showOperation: false,
        labelFun: (o) => o.treeLabel + ' (' + o.treeValue + ')',
        onClick: this.leftTreeOnClick
      },
      leftTreeData: [
        {
          label: '系部名称', prop: 'pasternName', width: '150px',
          rules: {trigger: 'change', required: true}
        },
        {
          label: '系部代码',
          prop: 'pasternCode',
          width: '150px',
          rules: {trigger: 'blur', required: true, isUnique: true}
        },
        {
          label: '排序字段', prop: 'pasternOrderBy', type: 'number', width: '150px', defaultValue: 0,
          rules: {trigger: 'change', required: true,}
        },
      ],
      tableData: [
        {
          prop: 'className',
          width: '150px',
          isFilter: true,
          rules: {trigger: 'change', required: true,}
        },
        {
          prop: 'majorCode',
          width: '150px',
          filterWidth: '150px',
          type: 'select',
          buildUrl: '/api/MajorManage/list',
          valueProp: 'majorCode',
          tableLabelFormat: (o) => o.majorName + '(' + o.majorCode + ')',
          filterLabelFormat: (o) => o.majorName + '(' + o.majorCode + ')',
          isFilter: true,
          rules: {trigger: 'change', required: true,}
        },
        {
          prop: 'classCode', width: '150px', isFilter: true,
          rules: {trigger: 'blur', required: true, isUnique: true}
        },
        {
          prop: 'classManageOrderBy', type: 'number', defaultValue: 0,
          rules: {trigger: 'change', required: true,}
        }]
    }
  },
  methods: {
    //此处 第一个值是 点击的对象 第二个查询条件对象 右侧有下拉选的不用管他 会自动更新
    leftTreeOnClick(nowNodeData, listQuery) {
      if (nowNodeData.parentId == '0') {
        listQuery.majorCode = ''
        listQuery.pasternCode = ''
      } else {
        listQuery.pasternCode = ''
        listQuery.majorCode = nowNodeData.id
      }
      return listQuery
    }
  }
}
</script>
