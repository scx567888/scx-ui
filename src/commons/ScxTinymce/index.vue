<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" style="width:auto">
    <textarea :id="tinymceId"/>
    <div class="editor-custom-btn-container">
      <el-button class="editor-upload-btn" size="mini" type="primary" @click="showUploadDialog">
        <scx-icon class="tinymce-upload-icon" icon="upload"/>
        上传本地图片
      </el-button>
    </div>
    <el-dialog v-model="dialogVisible" :close-on-click-modal=false append-to-body title="请选择本地图片">
      <scx-upload ref="scxUploadRef" :show-preview="true" @uploadSuccess="imageSuccessCBK"/>
      <template v-slot:footer>
        <el-button type="success" @click="handleSubmit">
          确定
        </el-button>
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import scxConfig from "../../../scx.config";
import {state} from "../../store";
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import "./index.css"

export default {
  name: 'scx-tinymce',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    let skipNextChangeEvent = false
    const tinymceId = 'scx-tinymce-' + new Date().getTime() + ((Math.random() * 1000).toFixed(0) + '')
    //上传图片的 dialog
    const dialogVisible = ref(false)
    //上传图片队列
    const uploadFileList = ref([])
    const fullscreen = ref(false)
    const scxUploadRef = ref(null)
    //因为 这个富文本编辑器的国际化和 框架本身的标识符有点不一样 在此处进行一个转义
    const languageTypeList = {
      'en': 'en',
      'zh-cn': 'zh_CN',
    }
    const themeList = {
      '': 'oxide',
      'dark': 'oxide-dark',
    }

    const language = computed(() => state.setting.language);
    const theme = computed(() => state.setting.theme);

    function initTinymce() {
      tinymce.init({
        selector: `#${tinymceId}`,
        language: languageTypeList[language.value],
        height: 400,
        skin: themeList[theme.value],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        menubar: 'file edit insert view format table',
        plugins: ['advlist anchor autolink code codesample  directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template  textpattern visualblocks visualchars wordcount autoresize'],
        branding: false,
        autosave_ask_before_unload: false,
        init_instance_callback: editor => {
          if (props.modelValue) {
            editor.insertContent(props.modelValue);
          }
          editor.on('NodeChange Change KeyUp SetContent', () => {
            if (skipNextChangeEvent) {
              skipNextChangeEvent = false
              return
            }
            context.emit('update:modelValue', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            fullscreen.value = e.state
          })
        },
      })
    }

    function destroyTinymce() {
      try {
        const tinymce = tinymce.get(tinymceId)
        if (tinymce) {
          tinymce.destroy()
        }
      } catch (e) {

      }

    }

    function showUploadDialog() {
      dialogVisible.value = true
      nextTick(() => {
        scxUploadRef.value.cleanFileList();
      })
    }

    //图片上传之后的回调
    function imageSuccessCBK(arr) {
      uploadFileList.value = arr.value
    }

    //点击上传
    function handleSubmit() {
      uploadFileList.value.forEach(v => {
        tinymce.get(tinymceId).insertContent(`<img style="width: 200px" src="${scxConfig.baseApi + '/base/showPicture/' + v.realUrl}"  alt="${v.name}"/>`)
      })
      dialogVisible.value = false
    }


    watch(() => props.modelValue, (newVal) => {
      let editorValue = tinymce.get(tinymceId).getContent();
      if (newVal !== editorValue) {
        skipNextChangeEvent = true
        tinymce.get(tinymceId).setContent(props.modelValue);
      }
    })

    onMounted(() => {
      initTinymce()
    });

    onUnmounted(() => {
      destroyTinymce()
    })

    return {
      fullscreen,
      tinymceId,
      showUploadDialog,
      initTinymce,
      imageSuccessCBK,
      handleSubmit,
      dialogVisible,
      scxUploadRef
    }

  }
}
</script>