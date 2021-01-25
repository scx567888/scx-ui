<template>
  <el-form ref="formPreview" :label-position="formSetting.labelPosition"
           :label-width="formSetting.labelWidth+'px'" :model="temp" :size="formSetting.formSize">
    <div v-for="(item,index) in formItemList" :key="item" :span="item.col">
      <el-form-item v-if='!["divider","p"].includes(item.type)' :label="item.label"
                    :prop='item.prop' :rules='item.rules'>
        <scx-easy-item :disabled="item.disabled" :style="{width:'100%'}"
                       :placeholder="item.placeholder"
                       :scx-easy-item-config="item"
                       :v-model="temp[item.prop]"/>
      </el-form-item>
      <el-divider v-if="item.type === 'divider'" content-position='left'>{{ item.text }}
      </el-divider>
      <p v-if="item.type === 'p'"
         :style="{'text-align': item.contentposition,'font-size':item.fontsize+'px',color:item.textcolor}">
        {{ item.text }}</p>
    </div>
  </el-form>
</template>

<script>

export default {
  name: "scx-form-preview",
  props: {
    //表单设置
    formSetting: {
      type: Object,
      default: () => {
        return {
          labelWidth: 80,
          labelPosition: 'left',
          formSize: 'small'
        }
      }
    },
    formItemList: {
      type: Array,
      default: () => []
    },
  },
  setup() {
    //数据对象
    const temp = {};
    return {temp};
  }
};
</script>
