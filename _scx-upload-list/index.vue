<template>
  <div class="scx-upload-list">

    <!-- 隐藏的 input 用于触发点击上传事件 -->
    <input ref="hiddenInputRef" multiple placeholder="file" style="display: none" type="file"
           @change="onHiddenInputChange">

    <scx-group v-model="uploadInfoList" :before-remove="beforeRemove" :show-move-button="!disabled" :show-remove-button="!disabled">
      <template v-if="!disabled" #before>
        <!-- 上传按钮 -->
        <button class="upload-button" type="button" @click="selectFile">
          点击上传, 当前共 {{ proxyModelValue.length }} 个文件
        </button>
      </template>
      <template #default="{index,item}">
        <img :src="item.previewURL" alt="img" class="preview-image">
        <div class="preview-text">
          <a v-if="item.downloadURL" :href="item.downloadURL" class="file-name">{{ item.fileName }}</a>
          <span v-else class="file-name">{{ item.fileName }}</span>
          <div v-if="item.progressVisible" class="progress-state">
            <div class="progress-state-text">{{ item.progressState }}</div>
            <scx-progress v-model="item.progressValue"/>
          </div>
          <div v-else class="item-info">
            上传时间 : {{ item.uploadTime }} 文件大小 : {{ item.fileSizeDisplay }}
          </div>
        </div>
      </template>
    </scx-group>

  </div>
</template>

<script>
import './index.css'
import {computed, inject, reactive, ref, watch} from "vue";
import ScxGroup from "../_scx-group/index.vue";
import ScxProgress from "../_scx-progress/index.vue";
import {ScxFSSHelper, UploadInfo} from "../_scx-upload/helper.js";
import {arrayEquals} from "../vanilla-array-utils.js";
import {percentage} from "../vanilla-percentage.js";

export default {
  name: "scx-upload-list",
  components: {
    ScxGroup,
    ScxProgress
  },
  props: {
    modelValue: {
      type: Array,
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
    disabled: { //若为 true 则只具有展示效果 不能上传删除和排序
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
      const needUploadFiles = Array.from(e.target.files);
      //重置 上传 input 的值 保证即使点击重复文件也可以上传
      hiddenInputRef.value.value = null;
      callUploadHandler(needUploadFiles);
    }

    const proxyModelValue = computed({
      get() {
        //处理有时外部数据为 null 或 undefined 的情况
        return props.modelValue ? props.modelValue : [];
      },
      set(value) {
        ctx.emit("update:modelValue", value);
      }
    });

    /**
     * 已上传的信息列表
     * @type {Ref<UnwrapRef<UploadInfo[]>>}
     */
    const uploadInfoList = ref([]);

    /**
     * 当前是否有上传任务 防止多次点击上传文件按钮上传时产生多次上传任务
     * @type {boolean}
     */
    let hasUploadTask = false;

    //上传文件
    async function callUploadHandler(needUploadFiles) {
      if (props.beforeUpload) {
        const result = await props.beforeUpload(needUploadFiles);
        if (!result) {
          return;
        }
      }
      for (const needUploadFile of needUploadFiles) {
        const i = new UploadInfo();
        i.fileName = needUploadFile.name;
        i.file = needUploadFile;
        i.progressState = "等待中";
        i.progressVisible = true;
        i.progressValue = 0;
        uploadInfoList.value.push(i);
      }
      //如果当前没有上传任务 则进行递归上传
      if (!hasUploadTask) {
        await callUploadHandler0();
      }
    }

    /**
     * 这里我们为了减少服务器的压力并不采取批量上传 而是一条传完再传下一条
     * @returns {Promise<void>}
     */
    async function callUploadHandler0() {
      hasUploadTask = true;
      const nextNeedUpload = uploadInfoList.value.find(u => u.progressState === "等待中");
      if (nextNeedUpload) {
        const progress = (v, s = "上传中") => {
          //处理一下百分比的格式防止  33.33333333333339 这种情况出现
          nextNeedUpload.progressState = s;
          nextNeedUpload.progressValue = percentage(v, 100);
        }
        try {
          nextNeedUpload.fileID = await getUploadHandler()(nextNeedUpload.file, progress);
          nextNeedUpload.progressVisible = false;
        } catch (e) {
          getOnError()(e, nextNeedUpload.file);
          nextNeedUpload.progressState = '上传失败';
        }
        const item = await getFileInfoHandler()(nextNeedUpload.fileID);
        nextNeedUpload.fill(item);
        nextNeedUpload.file = null;
        nextNeedUpload.progressValue = 0;
        //进行下一次上传
        await callUploadHandler0();
      } else {
        hasUploadTask = false;
      }
    }

    function getFileIDs(l) {
      return l.map(d => d.fileID).filter(d => d);
    }

    function callFileInfoHandler(fileIDs) {
      if (!arrayEquals(fileIDs, getFileIDs(uploadInfoList.value))) {
        console.log("外部发生变化 !!!");
        uploadInfoList.value = fileIDs.map(fileID => {
          const u = reactive(new UploadInfo());
          u.fileID = fileID;
          u.fileName = fileID;
          getFileInfoHandler()(u.fileID).then(item => u.fill(item));
          return u;
        });
      }
    }

    //我们根据 proxyModelValue 实时更新 fileInfo
    watch(proxyModelValue, (newVal) => callFileInfoHandler(newVal), {immediate: true});

    function callProxyModelHandler(list) {
      const fileIDs = getFileIDs(list);
      if (!arrayEquals(fileIDs, proxyModelValue.value)) {
        console.log("内部发生变化  !!!");
        proxyModelValue.value = fileIDs;
      }
    }

    watch(uploadInfoList, (newVal) => callProxyModelHandler(newVal), {deep: true});

    const beforeRemove = props.beforeDelete ? (info) => props.beforeDelete(info.copy()) : null;

    return {
      hiddenInputRef,
      uploadInfoList,
      proxyModelValue,
      beforeRemove,
      onHiddenInputChange,
      selectFile,
    }

  }
}
</script>