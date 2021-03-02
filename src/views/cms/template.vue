<template>
  <div class="template-manage">
    <div style="width: 30%;overflow-y: auto;height: 640px">
      <scx-tree :scx-tree-config="cmsFileTreeConfig" :scx-tree-data="cmsFileList"/>
    </div>
    <div style="width: 70%;height: 640px;margin-left: 5px;margin-right: 5px">
      <scx-code-mirror v-model="nowFileContent" :codeType="nowFileType"/>
      <el-button style="margin-top: 5px;margin-right: 5px;float: right" type="warning" @click="resetContent">
        重置
      </el-button>
      <el-button style="margin-top: 5px;" type="success" @click="saveContent">保存</el-button>
    </div>
    <el-dialog v-model="uploadVisible" title="上传文件">
      <el-upload
          ref="uploadRef"
          :action="baseUploadUrl"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
          :data="uploadData"
          :headers="tokenHeader"
          class="upload-demo"
          drag
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">上传文件，不超过5000kb</div>
      </el-upload>
      <template v-slot:footer>
        <el-button type="primary" @click="handleUploadFile()">
          {{ $t('table.confirmNoSpace') }}
        </el-button>
        <el-button @click="uploadVisible = false">
          {{ $t('table.cancelNoSpace') }}
        </el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="renameVisible" title="修改名称">
      <el-input v-model="renamedFileName"></el-input>
      <template v-slot:footer>
        <el-button type="primary" @click="handleRenameFile()">
          {{ $t('table.confirmNoSpace') }}
        </el-button>
        <el-button @click="renameVisible = false">
          {{ $t('table.cancelNoSpace') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script type="text/jsx">
import request from "../../utils/request";
import scxConfig from "../../../scx.config";
import {computed, ref} from "vue";
import {getToken} from "../../utils/permUtil";

export default {
  name: "templateManage",
  setup(props, context) {
    const cmsFileList = ref([]);

    function getCmsRootTreeList() {
      request.get("/api/cms/template").then(res => {
        cmsFileList.value = res.cmsRootTreeList
      })
    }


    const nowFileContent = ref('');
    const nowFileType = ref('');
    const nowFilePath = ref('');
    const uploadRef = ref(null);
    const uploadVisible = ref(false);
    const renameVisible = ref(false);
    const renamedFileName = ref('');
    const tokenHeader = {'S-Token': getToken()};

    const baseUploadUrl = scxConfig.baseApi + '/api/cms/template/upload';

    function cmsFileTreeRenderContent(h, {data}) {
      if (data.id === -1) {
        return h('span', {class: 'custom-tree-node'}, [
          h('span', {}, data.label),
          //todo 此处不能这样使用 el-button
          h('span', {}, [
            h('el-button', {
              size: 'mini',
              type: 'text',
              style: 'color:#409EFF',
              onClick: () => getCmsRootTreeList()
            }, '刷新'),
            h('el-button', {size: 'mini', type: 'text', style: 'color:#67C23A', onClick: () => uploadFile(data)}, '上传')
          ])
        ]);
      } else {
        if (data.type === 'Directory') {
          return h('span', {class: 'custom-tree-node'}, [
            h('div', {}, [
              h('i', {class: "el-icon-folder", style: "margin-right:5px"}, []),
              h('span', {}, data.id),
            ]),
            h('span', {}, [
              h('el-button', {
                size: 'mini',
                type: 'text',
                style: 'color:rgb(103, 194, 58)',
                onClick: () => uploadFile(data)
              }, '上传'),
              h('el-button', {
                size: 'mini',
                type: 'text',
                style: 'color:#409EFF',
                onClick: () => renameFile(data)
              }, '修改'),
              h('el-button', {
                size: 'mini',
                type: 'text',
                style: 'color:#F56C6C',
                onClick: () => deleteFile(data)
              }, '删除')
            ])
          ]);
        } else {
          return h('span', {class: 'custom-tree-node', onClick: () => getFileContent(data.filePath)}, [
            h('div', {}, [
              h('i', {class: "el-icon-document", style: "margin-right:5px"}, []),
              h('span', {}, data.id),
            ]),
            h('span', {}, [
              h('el-button', {
                size: 'mini', type: 'text', style: 'color:#409EFF', onClick: (e) => {
                  e.stopPropagation();
                  renameFile(data)
                }
              }, '修改'),
              h('el-button', {
                size: 'mini', type: 'text', style: 'color:#F56C6C', onClick: (e) => {
                  e.stopPropagation();
                  deleteFile(data);
                }
              }, '删除')
            ])
          ]);
        }
      }
    }

    function getFileContent(filePath) {
      nowFilePath.value = filePath
      request.post("/api/cms/template/getFileContent", {
        filePath: filePath
      }).then(res => {
        nowFileContent.value = res.fileContent;
        const fsp = filePath.split('.');
        nowFileType.value = fsp[fsp.length - 1];
      })
    }


    function saveContent() {

      request.post("/api/cms/template/setFileContent", {
        filePath: nowFilePath.value,
        fileContent: nowFileContent.value
      }).then(res => {
        nowFileContent.value = res.fileContent;

        this.$notify({
          title: '保存成功 !!!',
          type: 'success',
          duration: 4000
        });

      })

    }

    function uploadFile(data) {
      nowFilePath.value = data.filePath
      uploadVisible.value = true
    }

    function resetContent() {
      getFileContent(nowFilePath.value)
    }

    function deleteFile(data) {
      this.nowEditFile = data.filePath
      this.$confirm('此操作将永久删除该文件/文件夹, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post("/api/cms/template/file/delete", {filePath: this.nowEditFile}).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

    function renameFile(data) {
      renamedFileName.value = data.id
      nowFilePath.value = data.filePath
      renameVisible.value = true
    }

    //点击文件上传
    const handleUploadFile = () => {
      uploadRef.value.submit();
      uploadVisible.value = false;
    };

    function handleRenameFile() {
      request.post("/api/cms/template/file/rename", {
        newFilePath: renamedFileName.value,
        oldFilePath: nowFilePath.value
      }).then(res => {
        getCmsRootTreeList();
        renameVisible.value = false
      })
    }

    function beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isLt2M;
    }

    const uploadData = computed(() => {
      return {filePath: nowFilePath.value}
    })


    const cmsFileTreeConfig = {
      topLabel: '模板目录',
      renderContent: cmsFileTreeRenderContent
    }

    getCmsRootTreeList();

    return {
      uploadRef,
      renameVisible,
      cmsFileList,
      cmsFileTreeConfig,
      nowFileContent,
      nowFileType,
      uploadData,
      uploadVisible,
      baseUploadUrl,
      tokenHeader,
      renamedFileName,
      beforeAvatarUpload,
      saveContent,
      resetContent,
      handleUploadFile,
      handleRenameFile
    }
  }

}
</script>

<style>
.template-manage .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.template-manage {
  padding: 10px;
  display: flex;
}
</style>
