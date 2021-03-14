<template>
  <header v-if="crudContext.config.hasQueryOperation||crudContext.addButtons.length>0">
    <!--添加按钮 开始-->
    <div>
      <el-dropdown v-if="crudContext.addButtons.filter(a=>a.isDropDown).length>1"
                   v-permission="['*',crudContext.config.modelName+':save']"
                   :hide-on-click="false" class="header-item" split-button
                   type="success"
                   @click="crudContext.addButtons.filter(a=>a.isDropDown)[0].callback()">
        <i class="el-dropdown__icon el-icon-circle-plus"/>
        {{ $t(crudContext.addButtons.filter(a => a.isDropDown)[0].label) }}
        <template #dropdown>
          <el-dropdown-menu>
            <!--此处对自定义的添加按钮的下拉菜单进行渲染-->
            <div v-for="(col,index) in crudContext.addButtons.filter(a=>a.isDropDown)" :key="'el-dropdown-item'+index">
              <el-dropdown-item v-if="index!==0" :disabled="crudContext[col.disableState]"
                                @click.native="col.callback()">
                {{ $t(col.label) }}
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button v-for="(col,index) in crudContext.addButtons.filter(c=>!c.isDropDown)"
                 v-if="crudContext.addButtons.filter(a=>a.isDropDown).length===1"
                 :key="'add-button'+index"
                 :type="col.colorType?col.colorType:'primary'"
                 class="header-item"
                 icon="el-icon-circle-plus"
                 @click="col.callback()">
        {{ $t(col.label) }}
      </el-button>
    </div>
    <!--    添加按钮 结束-->
    <!--    <div v-html="messageDiv" style="margin:auto"></div>-->
    <!--查询列和查询按钮 开始-->
    <div v-if="crudContext.config.hasQueryOperation">
      <!--查询列 开始-->
      <div v-for="(col,index) in crudContext.items.filter(c=>c.isFilter)" :key="index"
           class="header-item">
        <scx-easy-item v-model="crudContext.queryParam.queryObject[col.prop]"
                       :isFilter="true"
                       :placeholder="col.label||t(crudContext.config.modelName+'.'+col.prop)"
                       :scx-easy-item-config="col"
                       :style="{width:col.filterWidth||'120px'}"
                       @change="handleFilter"
                       @clear="handleFilter"
                       @keyupEnter="handleFilter"/>
      </div>
      <!--查询列 结束-->
      <!--搜索按钮  开始-->
      <el-button class="header-item" icon="el-icon-search" round type="primary"
                 @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <!--搜索按钮  结束-->
      <!--重置按钮 开始-->
      <el-button circle class="header-item" icon="el-icon-back" style="margin: 0 !important"
                 type="warning"
                 @click="resetQueryParam"/>
      <!--重置按钮 开始-->
    </div>
    <!--查询列和查询按钮 结束-->
  </header>
</template>

<script>
import {computed, inject} from "vue";
import {t} from "../../../i18n";

export default {
  name: "scx-crud-header",
  setup() {
    //获取全局 上下文 及 事件总线
    const crudContext = inject('crudContext');
    const crudEventBus = inject('crudEventBus');


    // 初始化 添加按钮数据
    let defaultAddButtons = [ //添加按钮的数据
      {
        prop: 'create',
        label: 'table.add',
        callback: () => {
          crudEventBus.handleCreate('create')
        },
        colorType: 'success',
        isDropDown: true
      },
      {
        prop: 'excelImport',
        label: 'table.excelImport',
        callback: () => {
          crudEventBus.handleExcelDownload(1)
        },
        disableState: 'handleExcelDownloadNowPageDisabled',
        isDropDown: true
      },
      {
        prop: 'excelDownloadNow',
        label: 'table.excelDownloadNow',
        callback: () => {
          crudEventBus.handleExcelDownload(1)
        },
        disableState: 'handleExcelDownloadNowPageDisabled',
        isDropDown: true
      },
      {
        prop: 'excelDownloadNow',
        label: 'table.excelDownloadNow',
        callback: () => {
          crudEventBus.handleExcelDownload(1)
        },
        disableState: 'handleExcelDownloadNowPageDisabled',
        isDropDown: true
      }, {
        prop: 'excelDownloadNowFilter',
        label: 'table.excelDownloadNowFilter',
        callback: () => {
          crudEventBus.handleExcelDownload(2)
        },
        disableState: 'handleExcelDownloadNowDisabled',
        isDropDown: false
      }, {
        prop: 'excelDownloadAll',
        label: 'table.excelDownloadAll',
        callback: () => {
          crudEventBus.handleExcelDownload(3)
        },
        disableState: 'handleExcelDownloadAllDisabled',
        isDropDown: true
      }];


    crudContext.addButtons = computed(() => {
      const excludedProps = [];
      let tempAddButtons = defaultAddButtons.concat(crudContext.originalAddButtons);
      !crudContext.config.hasCreateButton && excludedProps.push('create');
      !crudContext.config.hasExcelDownloadTemplateButton && excludedProps.push('excelDownloadTemplate');
      !crudContext.config.hasExcelImport && excludedProps.push('excelImport');
      !crudContext.config.hasExcelDownloadNowDisabled && excludedProps.push('excelDownloadNow');
      !crudContext.config.hasExcelDownloadNowFilterDisabled && excludedProps.push('excelDownloadNowFilter');
      !crudContext.config.hasExcelDownloadAllDisabled && excludedProps.push('excelDownloadAll');
      return tempAddButtons.filter(item => !excludedProps.includes(item.prop));
    });

    return {crudContext, t}
  }
}
</script>

<style scoped>

</style>
