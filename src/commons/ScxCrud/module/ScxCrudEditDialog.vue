<template>
  <el-dialog v-model="crudContext.editDialog.visible" :append-to-body="crudContext.config.appendToBody"
             :close-on-click-modal=false
             :title="t(crudContext.pageFlag==='create'?'table.add':'table.edit')"
             :width="crudContext.config.dialogWidth" class="scx-dialog">
    <el-form ref="scxCreateAndUpdateFormRef" :class="crudContext.config.tableInline?' ':'scx-dialog-inline'"
             :inline="crudContext.config.tableInline"
             :label-width="crudContext.config.labelWidth" :model="crudContext.temp" :rules="crudContext.rules"
             label-position="right">
      <!--此处根据 type 不同渲染不同的组件-->
      <el-form-item
          v-for="(col,index) in crudContext.items.filter(c=>(c.type!=='tree')&&(c.type!=='group')&&(!c.showFlag||c.showFlag.includes(crudContext.pageFlag)))"
          :key="index"
          :class="col.inline?'scx-dialog-item-inline':''"
          :label="(col.label||t(crudContext.config.modelName+'.'+col.prop))+' : '"
          :prop="col.prop"
          :style="col.type==='tinymce'?'margin-right:0':''">
        <scx-easy-item v-model="crudContext.temp[col.prop]"
                       :disabled="(crudContext.pageFlag === 'update' && col.disableInEdit)"
                       :placeholder="crudEventBus.getPlaceholder(col)" :scx-easy-item-config="col"
                       @keyupEnter="crudEventBus.createOrUpdateModel()"/>
      </el-form-item>
      <div
          v-for="(groupCol) in crudContext.items.filter(gc=>gc.type==='group'&&(!gc.showFlag||gc.showFlag.includes(pageFlag)))">
        <div v-for="(groupItems,b) in crudContext.temp[groupCol.prop]" :key="b" class="scx-dialog-group-item">
          <el-form-item
              v-for="(col,index) in groupCol.groupItem.filter(gi=>(gi.type!=='tree')&&(!gi.showFlag||gi.showFlag.includes(pageFlag)))"
              :key="index"
              :label="(col.label||t(crudContext.config.modelName+'.'+col.prop))+' : '"
              :prop="groupCol.prop+'.' + b + '.'+col.prop">

            <scx-easy-item :disabled="crudContext.pageFlag === 'update' && col.disableInEdit"
                           :placeholder="crudEventBus.getPlaceholder(col)"
                           :scx-easy-item-config="col" :temp="crudContext.temp[groupCol.prop][b]"
                           @keyupEnter="crudEventBus.createOrUpdateModel()"
            />

          </el-form-item>
          <el-form-item label='删除当前项 : '>
            <el-button icon="el-icon-plus" size="small"
                       type="danger"
                       @click="groupItemDelete(groupCol,b)">删除此{{ groupCol.label }}
            </el-button>
          </el-form-item>
        </div>
        <div class=" el-input btn-add-group" style="text-align: center">
          <el-button icon="el-icon-plus" size="small" type="success"
                     @click="crudEventBus.groupItemAdd(groupCol)">
            添加{{ groupCol.label }}
          </el-button>
        </div>
      </div>
      <!-- 添加页面的树 开始-->
      <el-collapse v-if="crudContext.items.filter(th=>th.type==='tree').length>0"
                   :value="crudContext.editDialog.collapseList">
        <el-collapse-item
            v-for="(col,index) in crudContext.items.filter(c=>c.type==='tree'&&(!c.showFlag||c.showFlag.includes(crudContext.pageFlag)))"
            :key="'collapse-item'+index"
            :name="col.prop"
            :title="(col.label||t(crudContext.config.modelName+'.'+col.prop))+' : '"
            style="font-size: 14px;">
          <scx-tree v-model="crudContext.temp[col.prop]"
                    :scx-tree-config="{buildUrl:col.buildUrl,
                                         labelProp:col.labelProp,
                                         hasCheckbox:true,
                                         valueProp:col.valueProp}"
          />
        </el-collapse-item>
      </el-collapse>
      <!-- 添加页面的树 结束 -->
    </el-form>
    <!--最下方 确认和取消 按钮-->
    <template v-slot:footer>
      <el-button :loading="crudContext.editDialog.confirmButtonLoading" type="primary"
                 @click="crudEventBus.createOrUpdateModel()">
        {{ $t('table.confirmNoSpace') }}
      </el-button>
      <el-button @click="crudContext.editDialog.visible = false">
        {{ $t('table.cancelNoSpace') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import {computed, inject, ref} from "vue";
import {t} from "../../../i18n";

export default {
  name: "scx-crud-edit-dialog",
  setup() {
    const scxCreateAndUpdateFormRef = ref(null)
    const crudContext = inject('crudContext');
    const crudEventBus = inject('crudEventBus');
    crudContext.scxCreateAndUpdateFormRef = computed(() => scxCreateAndUpdateFormRef);
    console.log(crudContext.scxCreateAndUpdateFormRef)
    return {scxCreateAndUpdateFormRef, crudContext,crudEventBus, t}
  }
}
</script>

<style scoped>

</style>
