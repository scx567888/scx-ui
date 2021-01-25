<template>
  <div>
    <scx-crud :scx-crud-config="tableConfig" :scx-edit-button-data="editButton" :scx-table-data="tableData"/>
    <el-dialog :visible.sync="visible" title="查看二维码">
      <vue-qr :size="200" :text="nowId"></vue-qr>
    </el-dialog>
  </div>

</template>

<script type="text/jsx">
import vueQr from 'vue-qr'

export default {
  name: 'LogManage',
  components: {
    vueQr
  },
  data() {
    return {
      nowId: 0,
      visible: false,
      editButton: [{
        label: '查看二维码',
        colorType: 'success',
        type: 'doSomeThing',
        isDefault: true,
        doSomeThing: (row) => {
          this.nowId = row.id + '';
          this.visible = true;
        }
      }],
      tableConfig: {
        modelName: 'ChargingPile',
        operationWidth: '300px',
      },
      tableData: [
        {prop: 'chargingPileName', label: '充电桩名称', isFilter: true, hasSort: true},
        {
          prop: 'longitude', label: '经度', isFilter: true,
          hasSort: true
        },
        {prop: 'latitude', label: '纬度', isFilter: true, hasSort: true}
      ]
    }
  }
}
</script>
