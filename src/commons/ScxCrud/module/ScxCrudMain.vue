<template>
  <main>
    <button @click="crudEventBus.ccccc">vvvvv</button>
<!--    &lt;!&ndash;table 表格 开始&ndash;&gt;-->
<!--    <scx-table ref="scxTableRef"-->
<!--               :body="crudContext.tableBody"-->
<!--               :config="crudConfig"-->
<!--               :hasTableOperation="crudConfig.hasTableOperation&&editButtons.length>0"-->
<!--               :head="scxCrudItems.filter(tableCol=>!tableCol.noShowInTable&&tableCol.type!=='html')"-->
<!--               :loading="crudContext.tableLoading"-->
<!--               @getList="getList"-->
<!--               @handleDelete="handleDelete"-->
<!--               @handleUpdate="handleUpdate"-->
<!--               @nextPage="nextPage"-->
<!--               @previousPage="previousPage"-->
<!--               @sort-change="sortByProp">-->
<!--      <template v-slot:operation="{row}">-->
<!--        <el-button v-for="(col,index) in editButtons.filter(e=>e.isShow?e.isShow(row):true)"-->
<!--                   :key="index"-->
<!--                   :type="col.colorType"-->
<!--                   size="mini"-->
<!--                   @click="col.callback(row)">-->
<!--          {{ $t(col.label) }}-->
<!--        </el-button>-->
<!--      </template>-->
<!--    </scx-table>-->
    <!--table 表格 结束-->
  </main>
</template>

<script>
import {inject} from "vue";

export default {
  name: "scx-crud-main",
  setup(){
    const crudEventBus = inject('crudEventBus');
    const aaa=()=>{crudEventBus.ccccc()};
    return {aaa,crudEventBus}
  }
}
</script>

<style scoped>

</style>