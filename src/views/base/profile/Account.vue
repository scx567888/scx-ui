<template>
  <div>
    <el-form>
      <!--      <el-form-item label="昵称">-->
      <!--        <el-input v-model="user.nickName"/>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="电话">-->
      <!--        <el-input v-model="user.phoneNumber"/>-->
      <!--      </el-form-item>-->
      <el-form-item label="密码">
        <el-input v-model="temp.password" placeholder="留空为不更改" show-password/>
      </el-form-item>
      <!--      <el-form-item  label="身份证号">-->
      <!--        <el-input :disabled="true" v-model="user.idCard"/>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="籍贯">-->
      <!--        <el-input :disabled="true" v-model="user.nativePlace"/>-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submit">更新信息</el-button>
      </el-form-item>
    </el-form>
    <!--    <span style="color: red">*</span>-->
    <!--    <span>身份证号和籍贯请联系管理员进行修改!!!</span>-->
  </div>
</template>

<script>

import request from "../../../utils/request";

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          nickName: '',
          phoneNumber: '',
          idCard: '',
          nativePlace: '',
          password: ''
        }
      }
    },

  },
  methods: {
    submit() {
      // this.temp.nickName = this.user.nickName;
      // this.temp.phoneNumber = this.user.phoneNumber;
      // this.temp.password = this.user.password;
      // if (this.temp.nickName.trim() == '') {
      //   this.$message({
      //     message: '昵称不能为空',
      //     type: 'error',
      //     duration: 1500
      //   })
      //   return false
      // }
      // if (this.temp.phoneNumber.trim() == '') {
      //   this.$message({
      //     message: '电话号码不能为空',
      //     type: 'error',
      //     duration: 1500
      //   })
      //   return false
      // }
      if (this.temp.password.trim() === '') {
        delete this.temp.password;
      }
      request.post('/api/core/user/infoUpdate', this.temp).then(response => {
        if (response.success) {
          this.$notify({
            title: '修改基本信息成功',
            message: '建议刷新页面更新缓存',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '修改基本信息失败',
            message: '请重试',
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  },
  data() {
    return {
      value: true,
      temp: {
        // nickName: '',
        // phoneNumber: '',
        password: ''
      }
    }
  }
}
</script>
