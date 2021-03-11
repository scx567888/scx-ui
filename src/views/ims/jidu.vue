<template>
  <scx-crud :scx-crud-config="crudConfig" :scx-crud-items="crudItems"/>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: 'shouwendengji',
  setup() {
    const crudConfig = reactive({
      modelName: 'JiDu',//此处表示 页面 的国际化之类的
      editShow: 'jiDuMingCheng',
      labelWidth: '200px',
      dialogWidth: '90%'
    });

    const crudItems = ref([
      {
        label: '季度名称',
        prop: 'jiDuMingCheng',
        width: '150px',
        isFilter: true
      },
      {
        label: '季度开始时间',
        prop: 'startShiJian',
        type: 'date-picker',
        width: '300px',
        rules: {required: true, trigger: 'blur',}
      }, {
        label: '季度结束时间',
        prop: 'endShiJian',
        type: 'date-picker',
        width: '300px',
        rules: {required: true, trigger: 'blur',}
      },
      {
        label: '未完成任务分数',
        prop: 'jiDuFenShu',
        type: 'input-number',
        rules: {required: true, trigger: 'blur',}
      },
    ]);

    return {
      crudConfig,
      crudItems
    }
  }
}
</script>

