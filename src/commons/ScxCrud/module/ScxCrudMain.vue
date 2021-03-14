<template>
  <main>
    <!--table 表格 开始-->
    <scx-table ref="scxTableRef"
               :body="crudContext.tableBody"
               :config="crudContext.config"
               :hasTableOperation="crudContext.config.hasTableOperation&&crudContext.editButtons.length>0"
               :head="crudContext.items.filter(tableCol=>!tableCol.noShowInTable&&tableCol.type!=='html')"
               :loading="crudContext.tableLoading"
               @getList="crudEventBus.getList"
               @handleDelete="crudEventBus.handleDelete"
               @handleUpdate="crudEventBus.handleUpdate"
               @nextPage="crudEventBus.nextPage"
               @previousPage="crudEventBus.previousPage"
               @sort-change="crudEventBus.sortByProp">
      <template v-slot:operation="{row}">
        <el-button v-for="(col,index) in crudContext.editButtons.filter(e=>e.isShow?e.isShow(row):true)"
                   :key="index"
                   :type="col.colorType"
                   size="mini"
                   @click="col.callback(row)">
          {{ $t(col.label) }}
        </el-button>
      </template>
    </scx-table>
    <!--    table 表格 结束-->
  </main>
</template>

<script>
import {inject} from "vue";

export default {
  name: "scx-crud-main",
  setup() {
    const crudContext = inject('crudContext');
    const crudEventBus = inject('crudEventBus');

    return {crudEventBus, crudContext}
  }
}
</script>

<style scoped>

</style>
