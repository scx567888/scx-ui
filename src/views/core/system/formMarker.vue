<template>
  <el-tabs v-model="activeName" style="margin: 10px" @tab-click="handleClick">
    <el-tab-pane label="数据表单设计" name="first">
      <scx-form-design :form-design-form-item-list="formDesignFormItemList"
                       :form-design-form-setting="formDesignFormSetting"
                       @save="saveForm"/>
    </el-tab-pane>
    <el-tab-pane label="打印表单设计" name="second">
      <scx-tinymce/>
      <!-- 此处待处理     -->
      <span v-for="(item,index) in formDesignFormItemList">
        {{ item.prop }}
      </span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import request from "/@/utils/request";

export default {
  name: "formMarker",
  data() {
    return {
      formDesignFormSetting: {labelWidth: 80},
      formDesignFormItemList: [],
      activeName: 'first'
    }
  },
  methods: {
    saveForm(data) {
      request.put('/api/form', {
        id: Number(this.$route.query.id),
        configure: JSON.stringify(data)
      }).then((data) => {
        this.$notify({
          title: '保存成功 !!!',
          type: 'success',
          duration: 4000
        });
      })
    },
    handleClick() {
      console.log(123)
    },
    initFormDesign() {
      const _this = this;
      request.get('/api/form/' + this.$route.query.id).then((data) => {
        if (data.items.configure) {
          const formData = JSON.parse(data.items.configure);
          if (formData) {
            if (formData.formDesignFormSetting) {
              _this.formDesignFormSetting = formData.formDesignFormSetting
            }
            if (formData.formDesignFormSetting) {
              _this.formDesignFormItemList = formData.formDesignFormItemList
            }
          }
        }
      })
    }
  },
  mounted() {
    // this.initFormDesign()
  },
  activated() {
    // this.initFormDesign()
  }
}
</script>

<style>

</style>