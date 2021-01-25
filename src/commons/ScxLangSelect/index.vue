<template>
  <el-dropdown appendToBody trigger="hover" @command="handleSetLanguage">
    <div>
      <scx-icon icon="language"/>
    </div>
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language==='zh-cn'" command="zh-cn">
          简体中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language==='en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import {changeSetting, state} from "../../store";
import {t} from "../../i18n";
import {computed} from "vue";
import {ElMessage} from 'element-plus'

export default {
  name: 'scx-lang-select',
  setup() {
    function handleSetLanguage(nowLang) {
      changeSetting('language', nowLang);
      ElMessage.success(t('setting.setLanguageSuccess'));
    }

    const language = computed(() => state.setting.language);
    return {handleSetLanguage, language}
  }
}
</script>
