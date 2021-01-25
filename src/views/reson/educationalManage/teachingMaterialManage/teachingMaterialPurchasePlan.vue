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
  name: 'MaterialPurchasePlan',
  data() {
    return {
      scxTableConfig: {
        editShow: 'planName',
        modelName: 'MaterialBill',
        //是否有添加按钮
        hasCreateButton: true,
        //是否有更新按钮 注意 如果此两项 都为 false 则不显示 操作 并覆盖掉 hasTableOperation 的设置
        hasUpdateButton: true,
        //是否有删除按钮
        hasDeleteButton: true,
        //是否有表格右侧的 操作列
        hasTableOperation: true,
        tableType: 'leftTreeAndTable'
      },
      leftTreeConfig: {
        buildUrl: '/api/MaterialPurchasePlan/list',
        topLabel: '采购计划',
        //左侧树 crud 的 model
        modelName: 'MaterialPurchasePlan',
        editName: 'planName',
        editShow: 'term',
        showOperation: true,
        showFilterInput: true,
        labelFun: (o) => o.planName + ' (' + o.term + ')',
        onClick: this.leftTreeOnClick
      },
      leftTreeData: [
        {
          prop: 'planName', width: '150px',
          rules: {trigger: 'change', required: true}
        },
        {
          prop: 'term',
          width: '150px',
          rules: {trigger: 'blur', required: true, isUnique: true}
        },
      ],
      tableData: [
        {
          label: '采购计划',
          filterWidth: '200px',
          prop: 'planId',
          width: '350px',
          isFilter: true,
          type: 'selectByUrl',
          selectByUrl: '/api/MaterialPurchasePlan/list',
          selectByUrlLabel: 'planName',
          selectByUrlValue: 'id',
          tableLabelFormat: (o) => o.planName + '(' + o.term + ')',
          filterLabelFormat: (o) => o.planName + '(' + o.term + ')',
          rules: {trigger: 'change', required: true,}
        },
        {
          label: '教材名称',
          filterWidth: '200px',
          prop: 'materialId',
          width: '250px',
          isFilter: true,
          type: 'selectByUrl',
          selectByUrl: '/api/MaterialManage/list',
          selectByUrlLabel: 'materialName',
          selectByUrlValue: 'id',
          rules: {trigger: 'change', required: true,}
        },
        {
          label: '采购数量',
          prop: 'payNum',
          rules: {trigger: 'change', required: true,}
        }]
    }
  },
  methods: {
    //此处 第一个值是 点击的对象 第二个查询条件对象 右侧有下拉选的不用管他 会自动更新
    leftTreeOnClick(nowNodeData, listQuery) {
      listQuery.planId = nowNodeData.id
      return listQuery
    }
  }
}
</script>
