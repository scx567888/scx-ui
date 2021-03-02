<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
</template>

<script>
export default {
  name: 'StoreTypeManage',
  data() {
    return {
      tableConfig: {
	        modelName: 'StoreTypeManage',
	        module: 'bole',
	        labelWidth:'200px',
		      dialogWidth:'70%',
      },
      tableData: [
	        {
	          prop: 'typeName', width: '100px', isFilter: true,
	          rules: {required: true, trigger: 'change'}
	        },
       ]
    }
  }
}
</script>
