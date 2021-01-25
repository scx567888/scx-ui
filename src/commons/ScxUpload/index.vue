<template>
  <div>
    <input ref="hiddenUploadInputRef" multiple style="display: none" type="file" @change="fileUpload"/>
    <scx-progress v-if="progressContext.isShow" v-model="progressContext.value"/>
    <el-button class="upload-btn" size="mini" type="success" @click="hiddenUploadInputRef.click()">
      <scx-icon type="outlined" icon="cloud-upload"/>
      点击上传 , 共 {{ fileList.length }} 个文件
    </el-button>
    <div class="file-list">
      <div v-for="item in fileList" class="file-list-item">
        <div>
          <el-image style="width: 70px; height: 70px" :src="getRealUrl(item)+'?w=200&h=200'"
                    :preview-src-list="[getRealUrl(item)]"/>
          <div class="file-list-info">
            <span @click="handleClick(item)">{{ item.fileName }}</span>
            <span>上传时间 : {{ item.uploadTime }} 文件大小 : {{ item.fileSize }}</span>
          </div>
        </div>
        <div class="remove-btn" @click="removeFile(item)">
          <scx-icon type="outlined" icon="close"/>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import request from '../../utils/request.js';
import scxConfig from '../../../scx.config.js';
import {download, formatFileSize} from '../../utils';
import {reactive, ref, watch} from 'vue';
import './index.css';
import {ElMessage} from "element-plus";
import {postFile, splitFile, validateFile} from "./utils";

export default {
  name: 'scx-upload',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
    }
  },
  setup(props, context) {
    const hiddenUploadInputRef = ref(null);//隐藏的文件id

    const uploadConfig = reactive({
      maxUploadSize: 10 * 1024 * 1024 * 1024, // 上传最大文件10 GB
      multiUploadSize: 10 * 1024 * 1024, // 大于这个大小的文件使用分块上传(后端可以支持断点续传)
      splitSize: 2 * 1024 * 1024 // 每块文件大小
    });

    new function initConfig() {
      Object.assign(uploadConfig, props.config);
    }

    const progressContext = reactive({
      value: 0,//进度条值
      isShow: false//是否显示进度条
    })

    const fileList = ref([]);//上传的文件列表

    async function uploadFile(file) {
      progressContext.isShow = true;
      //获取当前文件的大小
      const fileSize = file.size;
      //文件不能超过 上传的最大值
      if (fileSize > uploadConfig.maxUploadSize) {
        ElMessage.error('文件不能大于10GB!!! 问题文件 : ' + file.name);
        return;
      }
      //进度条置为0
      progressContext.value = 0;
      if (fileSize > uploadConfig.multiUploadSize) {
        //如果文件大于 单个文件上传限制 就使用分段上传
        await splitUpload(file);
      } else {
        //否则的话使用单一文件上传
        await singleUpload(file);
      }
    }

    // 单文件直接上传
    async function singleUpload(file) {
      const param = {
        file,
        fileName: file.name,
        fileSize: formatFileSize(file.fileSize),
        chunksNumber: -1,
        chunk: -1,
        type: 0
      }
      //进行上传单个文件的操作
      await postFile(param).then(res => {
        if (res.message === 'ok') {
          fileList.value.unshift(res.items);
          progressContext.value = 100;
          setTimeout(() => {
            progressContext.isShow = false
            progressContext.value = 0
          }, 1000);
          ElMessage.success(res.items.fileName + ' : 上传成功!!!');
        } else {
          ElMessage.error(res.items.fileName + ' : 上传失败!!!');
        }
      });
    }

    // 大文件分块上传
    function splitUpload(file) {
      const splitSizeNumber = uploadConfig.splitSize;
      //根据该文件的大小 计算文件应该分为多少块
      const chunks = Math.ceil(file.size / splitSizeNumber)
      //把文件进行分块 得到一个分割完的 文件数组
      const fileChunks = splitFile(file, splitSizeNumber, chunks)
      //设置当前的 分块 索引
      let currentChunkRes = validateFile({
        chunks: fileChunks.length,
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        type: 0
      })
      let currentChunk = currentChunkRes.lastChunk
      for (let i = 0; i < fileChunks.length; i++) {
        //设置进度条
        progressContext.value = Math.round(currentChunk / fileChunks.length * 10000) / 100.00;
        // 服务端检测已经上传到第currentChunk块了，那就直接跳到第currentChunk块，实现断点续传
        if (Number(currentChunk) === i) {
          // 每块上传完后则返回需要提交的下一块的index
          const result = postFile({
            chunk: i,
            fileName: file.name,
            file: fileChunks[i],
            fileSize: 0,
            chunksNumber: chunks,
            type: 1
          });
          currentChunk = result.chunk
        }
      }
      //让进度条显示只差一点点 因为还没有合并完成
      progressContext.value = 99.98;
      const isValidate = validateFile({
        chunks: fileChunks.length,
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        type: 1
      })
      if (isValidate.message === 'ok') {
        //当合并完成后 将进度条走完
        progressContext.value = 100;
        setTimeout(() => progressContext.isShow = false, 1000);
        ElMessage.success("文件上传成功!!!")
        setFileData(isValidate)
      }
    }


    async function removeFile(file) {
      const msg = await request.delete('/api/core/uploadFile/' + file.id, {}).then(res => res.message);
      if (msg === 'success') {
        const index = fileList.value.indexOf(file);
        fileList.value.splice(index, 1);
        ElMessage.success('文件删除成功!!!');
        returnBackFn()
      } else {
        ElMessage.error('文件删除失败!!!');
      }
    }

    function getList(fileIds) {
      request.post('/api/core/uploadFile/listByIds', {
        page: 1,
        limit: -1,
        sort: "desc",
        orderBy: "id",
        fileIds: fileIds
      }).then(response => {
        //可以读取的文件
        const canReadFileList = response.items
        //此处过滤出 无法读取的文件
        const loseFileIds = props.modelValue.split(',').filter(f => canReadFileList.filter(s => s.id == f).length === 0);

        if (loseFileIds !== 0 && loseFileIds[0] !== '') {
          loseFileIds.forEach(s => {
            canReadFileList.unshift({id: s, fileName: '文件无法读取!!! id 为:' + s, uploadTime: '未知!!!', fileSize: '未知!!!'})
          })
        }

        fileList.value = canReadFileList
      })
    }

    const handleClick = ({realUrl}) => download(scxConfig.baseApi + '/base/download/' + realUrl);


    //清楚事件给外部调用
    function cleanFileList() {
      fileList.value = [];
    }

    function fileUpload(e) {
      const needUploadFileList = [];
      const files = Array.from(e.target.files);
      for (const file of files) {
        uploadFile(file).then(() => {
          needUploadFileList.push(0)
          if (needUploadFileList.length === files.length) {
            console.log("全部文件上传完毕");
            context.emit('uploadSuccess', fileList);
          }
        })
      }
    }

    watch(fileList, (newVal, oldVal) => {
      console.log(1233)
      // context.emit('update:modelValue', newVal);
    })

    watch(() => props.modelValue, (newVal, oldVal) => {
      console.log(newVal)
      getList(newVal)
      // if (newVal !== fileIds) {
      //   skipNextChangeEvent = true

      // }
    })

    const getRealUrl = (item) => scxConfig.baseApi + '/base/download/' + item.filePath;


    // getList(props.modelValue)

    return {
      progressContext,
      fileUpload,
      fileList,
      handleClick,
      removeFile,
      cleanFileList,
      hiddenUploadInputRef,
      getRealUrl
    }
  }
};
</script>