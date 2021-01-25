<template>
  <div class="scx-code-mirror">
    <textarea ref="scxTinyMceRef"/>
  </div>
</template>

<script>
import {state} from '../../store'
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import './index.css'
import {getCodeType} from './utils.js'

export default {
  name: "scx-code-mirror",
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    codeType: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {

    //富文本编辑器
    const scxTinyMceRef = ref(null);

    let editor = null;

    let skipNextChangeEvent = false

    const theme = computed(() => state.setting.theme);

    function setTheme(theme) {
      if (theme === 'dark') {
        editor.setOption("theme", "darcula");
      } else {
        editor.setOption("theme", "idea");
      }
    }

    watch(theme, (val) => setTheme(val))

    watch(() => props.modelValue, (newVal) => {
      let editorValue = editor.getValue();
      if (newVal !== editorValue) {
        skipNextChangeEvent = true
        let scrollInfo = editor.getScrollInfo();
        editor.setValue(newVal)
        editor.scrollTo(scrollInfo.left, scrollInfo.top)
      }
    })

    watch(() => props.codeType, (newVal) => {
      editor.setOption('mode', getCodeType(newVal))
    })


    function initCodeMirror() {
      editor = CodeMirror.fromTextArea(scxTinyMceRef.value, {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: {"Ctrl-Q": "toggleComment"}
      });
      setTheme(theme.value)
      editor.setOption('mode', getCodeType(props.codeType))
      if (props.modelValue) {
        editor.setValue(props.modelValue);
      }
      editor.on('change', (coder) => {
        if (skipNextChangeEvent) {
          skipNextChangeEvent = false
          return
        }
        context.emit('update:modelValue', coder.getValue())
      })
    }


    onMounted(() => {
      initCodeMirror();
    });
    onUnmounted(() => {
      editor.toTextArea()
    })

    return {scxTinyMceRef}
  }
}
</script>