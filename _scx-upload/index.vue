<template>
  <div class="scx-upload">

    <!-- 隐藏的 input 用于触发点击上传事件 -->
    <input ref="hiddenInputRef" placeholder="file" style="display: none" type="file" @change="onHiddenInputChange"/>

    <!-- 有文件时预览文件 -->
    <div v-if="proxyModelValue" class="preview">
      <!-- 有预览图时显示预览图 -->
      <img v-if="uploadInfo.previewURL" :src="uploadInfo.previewURL" alt="img" class="preview-image">
      <!-- 没有预览图但是有文件名时显示文件名 -->
      <div v-else-if="uploadInfo.fileName" class="preview-text">
        <div>{{ uploadInfo.fileName }}</div>
      </div>
      <!-- 都没有时显示文件 id -->
      <div v-else class="preview-text">
        <div>{{ proxyModelValue }}</div>
      </div>
      <!-- 操作项 -->
      <div class="operation">
        <a :href="uploadInfo.downloadURL" class="item-download">
          下载
        </a>
        <div v-if="!disabled" class="item-replace" @click="selectFile">
          替换
        </div>
        <div v-if="!disabled" class="item-delete" @click="deleteFile">
          删除
        </div>
      </div>
    </div>

    <!-- 没有文件且允许上传时显示 -->
    <div v-else-if="!disabled" :class="dragover ?'dragover ':''" class="no-preview" @click="selectFile"
         @dragleave="callDragleave"
         @dragover="callDragover" @drop="callDrop">
      <scx-icon icon="outlined-plus-circle"/>
      <span>点击或拖拽</span>
    </div>

    <!-- 没有文件且不允许上传时 -->
    <div v-else class="no-preview">
      <scx-icon icon="outlined-question"/>
      <span>无图片</span>
    </div>

    <div v-if="uploadInfo.progressVisible" class="progress">
      <div class="temp-file-name">
        <div>
          {{ uploadInfo.fileName }}
        </div>
      </div>
      <div class="progress-state">
        <div class="progress-state-text">
          {{ uploadInfo.progressState }}
        </div>
        <!-- 以下为进度条 -->
        <scx-progress v-model="uploadInfo.progressValue"/>
      </div>

    </div>

  </div>
</template>

<script>
import './index.css'
import {computed, inject, reactive, ref, watch} from "vue";
import ScxIcon from "../_scx-icon/index.vue";
import ScxProgress from "../_scx-progress/index.vue";
import {percentage} from "../vanilla-percentage.js";
import {ScxFSSHelper, UploadInfo} from "./helper.js";

export default {
  name: "scx-upload",
  components: {
    ScxProgress,
    ScxIcon
  },
  props: {
    modelValue: {
      type: String,
      default: null
    },
    uploadHandler: {
      type: Function,
      default: null
    },
    fileInfoHandler: {
      type: Function,
      default: null
    },
    beforeUpload: {
      type: Function,
      default: null
    },
    onError: {
      type: Function,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    beforeDelete: {
      type: Function,
      default: null
    }
  },
  setup(props, ctx) {

    const scxFSS = inject("scx-fss", null);

    const scxFSSHelper = new ScxFSSHelper(scxFSS);

    function getFileInfoHandler() {
      return props.fileInfoHandler ? props.fileInfoHandler : (fileID) => scxFSSHelper.fileInfoHandler(fileID);
    }

    function getUploadHandler() {
      return props.uploadHandler ? props.uploadHandler : (needUploadFile, progress) => scxFSSHelper.uploadHandler(needUploadFile, progress);
    }

    function getOnError() {
      return props.onError ? props.onError : (error, file) => console.error(error, file);
    }

    const hiddenInputRef = ref(null);

    function selectFile() {
      hiddenInputRef.value.click();
    }

    function onHiddenInputChange(e) {
      const needUploadFile = e.target.files[0];
      //重置 上传 input 的值 保证即使点击重复文件也可以上传
      hiddenInputRef.value.value = null;
      callUploadHandler(needUploadFile);
    }

    const proxyModelValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        ctx.emit("update:modelValue", value);
      }
    });

    async function deleteFile() {
      if (props.beforeDelete) {
        const result = await props.beforeDelete(uploadInfo.copy());
        if (!result) {
          return;
        }
      }
      proxyModelValue.value = '';
    }

    const uploadInfo = reactive(new UploadInfo());

    async function callUploadHandler(needUploadFile) {
      if (props.beforeUpload) {
        const result = await props.beforeUpload(needUploadFile);
        if (!result) {
          return;
        }
      }
      //设定初始值
      uploadInfo.progressVisible = true;
      uploadInfo.fileName = needUploadFile.name;
      //上传回调函数
      const progress = (v, s = "上传中") => {
        //处理一下百分比的格式防止  33.33333333333339 这种情况出现
        uploadInfo.progressState = s;
        uploadInfo.progressValue = percentage(v, 100);
      }
      //开始上传
      try {
        proxyModelValue.value = await getUploadHandler()(needUploadFile, progress);
      } catch (e) {
        getOnError()(e, needUploadFile);
      }
      uploadInfo.progressState = "上传完毕";
      uploadInfo.progressVisible = false;
      uploadInfo.progressValue = 0;
    }

    function callFileInfoHandler(fileID) {
      if (fileID) {
        getFileInfoHandler()(fileID).then(item => uploadInfo.fill(item));
      } else {
        uploadInfo.reset();
      }
    }

    //我们根据 proxyModelValue 实时更新 fileInfo
    watch(proxyModelValue, (newVal) => callFileInfoHandler(newVal), {immediate: true});

    const dragover = ref(false);

    function callDrop(e) {
      e.preventDefault();
      dragover.value = false;
      const needUploadFile = e.dataTransfer.files[0];
      callUploadHandler(needUploadFile);
    }

    function callDragover(e) {
      e.preventDefault();
      dragover.value = true;
    }

    function callDragleave(e) {
      e.preventDefault();
      dragover.value = false;
    }

    return {
      hiddenInputRef,
      proxyModelValue,
      uploadInfo,
      dragover,
      onHiddenInputChange,
      selectFile,
      deleteFile,
      callDrop,
      callDragover,
      callDragleave
    }

  }
}
</script>