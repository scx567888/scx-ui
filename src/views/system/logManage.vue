<template>
  <scx-crud :scx-crud-config="crudConfig" :scx-crud-items="crudItems"/>
</template>

<script>
import {h} from 'vue'

export default {
  name: 'LogManage',
  data() {
    return {
      crudConfig: {
        modelName: 'ScxLog',
        module: 'core',
        hasExcelDownloadNowDisabled: false,
        hasExcelDownloadNowFilterDisabled: false,
        hasCreateButton: false,
        hasUpdateButton: false,
        hasBatchDelete: false,
        hasMultiSelectButton: true,
        addButtonShowType: false,
        tableScrollBarHeight: null
      },
      crudItems: [
        {prop: 'userIp', label: '用户ip', isFilter: true, tableWidth: '10%', hasSort: true},
        {
          prop: 'type', label: '类型', isFilter: true,
          tableWidth: '10%',
          tableLabelFormat: (o) => o.type === 0 ? h('span', {style: 'color:red'}, '系统日志') :
              h('span', {style: 'color:green'}, '用户日志'),
          hasSort: true
        },
        {prop: 'username', label: '操作人姓名', isFilter: true, tableWidth: '10%', hasSort: true},
        {prop: 'title', label: '事件标题', isFilter: true, tableWidth: '20%', hasSort: true},
        {prop: 'content', label: '事件内容', isFilter: true, tableWidth: '20%', hasSort: true},
        {
          prop: 'createDate', label: '时间', isFilter: true, type: 'datetime',
          tableWidth: '20%',
          filterWidth: '260px',
          hasSort: true
        }
      ]
    }
  }
}
</script>
