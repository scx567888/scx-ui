<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于我</span>
    </div>
    <div class="user-profile">
      <div class="box-center">
        <el-upload
            :action="baseUploadUrl"
            :before-upload="beforeAvatarUpload"
            :data="getFileName()"
            :headers="tokenHeader"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :with-credentials='true'
            class="avatar-uploader">
          <img v-if="imageUrl" :alt="user.nickName" :src="imageUrl" class="avatar"
               @error="show_default_image">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.nickName }}</div>
      </div>
    </div>

    <div v-if="false" class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <scx-icon icon-class="education"/>
          <span>我的电话</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.phoneNumber }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import scxConfig from '../../../../scx.config'
import request from "/@/utils/request";

var token = sessionStorage.getItem('S-Token') // 要保证取到
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          perms: '',
          nickName: '',
          phoneNumber: ''
        }
      }
    }
  },
  data() {
    return {
      imageUrl: this.user.avatar,
      baseUploadUrl: scxConfig.baseApi + '/base/upload',
      tokenHeader: {'S-Token': token}
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      var temp = {'avatar': res.items.filePath};
      request.post('/api/User/avatarUpdate', temp).then(data => {
        if (data.success) {
          this.$notify({
            title: '修改头像成功',
            message: '建议刷新页面更新头像缓存',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '添加失败',
            message: '请重试',
            type: 'error',
            duration: 2000
          })
        }

      })
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
      const isGIF = file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG , PNG 或 GIF 格式!');
      }
      if (isGIF) {
        this.$message.warning('GIF 格式将会转换为静态图片!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt2M;
    },
    getFileName() {
      return {fileName: '', fileSize: '', chunksNumber: 0, chunk: 0, type: 0}
    },
    show_default_image(event) {
      event.target.src = './_assets/img/defaultAvatar.gif';
    }
  }
}
</script>

<style lang="css" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile .user-name {
  font-weight: bold;
}

.user-profile .box-center {
  padding-top: 10px;
}

.user-profile .user-role {
  padding-top: 10px;
  font-weight: 400;
  font-size: 14px;
}

.user-profile .box-social {
  padding-top: 30px;
}

.user-profile .box-social .el-table {
  border-top: 1px solid #dfe6ec;
}

.user-profile .user-follow {
  padding-top: 20px;
}

.user-bio {
  margin-top: 20px;
  color: #606266;
}

.user-bio span {
  padding-left: 4px;
}

.user-bio .user-bio-section {
  font-size: 14px;
  padding: 15px 0;
}

.user-bio .user-bio-section .user-bio-section-header {
  border-bottom: 1px solid #dfe6ec;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
