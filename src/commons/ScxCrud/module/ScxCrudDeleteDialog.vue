<template>
  <el-dialog v-model="crudContext.deleteDialog.visible" title="删除选中数据"
             @keyup.enter.native="batchDeleteModel(true)">
    <div class="batchDeleteMessage">您将要删除以下数据 删除后不能恢复 , 共 {{ crudContext.deleteDialog.tableBody.length }} 条 !!</div>
    <scx-table :body="crudContext.deleteDialog.tableBody"
               :config="{maxHeight:350}"
               :head="[{label:t(scxCrudConfig.modelName+'.'+scxCrudConfig.editShow)||'被删除数据',prop:scxCrudConfig.editShow}]"
               :loading="false">
      <template v-slot:operation="{row}">
        <el-button size="mini" type="warning" @click="removeDeleteArray(row)">{{ $t('table.removeDeleteArray') }}
        </el-button>
      </template>
    </scx-table>
    <template v-slot:footer>
      <el-button :disabled="crudContext.deleteDialog.tableBody.length===0" type="primary"
                 @click="batchDeleteModel(false)">
        {{ $t('table.confirmNoSpace') }}
      </el-button>
      <el-button @click="crudContext.deleteDialog.visible = false">
        {{ $t('table.cancelNoSpace') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "scx-crud-delete-dialog"
}
</script>

<style scoped>

</style>