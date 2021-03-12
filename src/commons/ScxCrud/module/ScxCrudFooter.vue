<template>
  <footer>
    <!--左下方批量删除按钮 开始-->
    <el-popover v-if="crudConfig.hasBatchDelete"
                v-model:visible="crudContext.deleteDialog.batchDeleteButtonVisible"
                placement="top"
                width="180">
      <p>
        {{ $t('table.isWillBeDelete') }}
        <span style="color: #ff4949">{{ $t('table.allSelectedData') }}</span>
        {{ $t('table.and') }}
        <span style="color: #ff4949">{{ $t('table.cannotRevoke') }}</span>
      </p>
      <div style="text-align: right;">
        <el-button size="mini" type="text" @click="crudContext.deleteDialog.batchDeleteButtonVisible = false">
          {{ $t('table.cancelNoSpace') }}
        </el-button>
        <el-button size="mini" type="danger" @click="batchDeleteModel(false)">
          {{ $t('table.confirmNoSpace') }}
        </el-button>
      </div>
      <template #reference>
        <el-button v-permission="['*',scxCrudConfig.modelName+':batchDelete']" class="footer-item" plain
                   type="danger">{{ $t('table.batchDelete') }}
        </el-button>
      </template>

    </el-popover>
    <el-pagination v-if="crudConfig.hasPagination" :currentPage="crudContext.queryParam.page"
                   :page-size="crudContext.queryParam.limit" :page-sizes="[10,  50, 200,500,1000]"
                   :total="crudContext.total" background
                   class="footer-item" layout='total, sizes, prev, pager, next, jumper' style="padding: 3px 0"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"/>
  </footer>
</template>

<script>
export default {
  name: "scx-crud-footer"
}
</script>

<style scoped>

</style>