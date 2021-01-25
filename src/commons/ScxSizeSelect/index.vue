<template>
  <el-dropdown appendToBody trigger="click" @command="handleSetSize">
    <div>
      <scx-icon icon="size"/>
    </div>
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in sizeOptions" :command="item" :disabled="size===item">
          {{ t('navbar.' + item) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import {changeSetting, state} from "../../store";
import {t} from "../../i18n";
import {computed} from "vue";

export default {
  name: 'scx-size-select',
  setup() {

    const sizeOptions = ['big', 'medium', 'small'];

    const size = computed(() => state.setting.size)

    function handleSetSize(nowSize) {
      changeSetting('size', nowSize)
    }

    return {t, sizeOptions, size, handleSetSize}
  }
}
</script>
