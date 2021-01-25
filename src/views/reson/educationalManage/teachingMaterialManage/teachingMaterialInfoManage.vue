<template>
  <scx-crud :scx-crud-config="scxTableConfig"
            :scx-table-data="tableData"
  />
</template>
<script>

export default {
  name: 'MaterialManage',
  data() {
    return {
      scxTableConfig: {
        modelName: 'MaterialManage',
        editShow: 'materialName',
      },
      tableData: [
        {
          prop: 'materialName',
          width: '180px',
          isFilter: true,
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'materialNature',
          width: '110px',
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'materialCode',
          width: '110px',
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'materialType',
          width: '110px',
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'press',
          width: '100px',
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'editorInChief',
          width: '100px',
          maxlength: 32,
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'edition',
          width: '120px',
          maxlength: 32,
          type: 'number',
          rules: {required: true, trigger: 'blur'}
        },
        {
          prop: 'pressYear',
          maxlength: 32,
          type: 'date',
          rules: {required: true, trigger: 'blur'}
        }],
    }
  }
}
</script>
