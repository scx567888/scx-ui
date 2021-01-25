<template>
  <div v-drag="dragEvent" :class="['scx-right-panel-handle-button',{showRightPanel}]">
    <scx-icon :icon="showRightPanel?'close':'setting'" type="outlined"/>
  </div>
  <div :class="['scx-right-panel',{showRightPanel}]">
    <div class="setting-container">
      <h3>{{ $t('setting.title') }}</h3>
      <div>
        <span><scx-icon icon="clothes" type="filled"/>:  {{ $t('setting.themeChoice') }}</span>
      </div>
      <div style="flex-wrap:wrap;margin-bottom: 0;">
        <div v-for="(tItem,index) in themes" class="theme-item" @click="theme=tItem.theme">
          <div :style="{backgroundColor: tItem.leftColor}"></div>
          <div :style="{background: tItem.mainColor}">
            <div :style="{backgroundColor: tItem.topColor}"></div>
          </div>
          <div v-if="theme===tItem.theme" :style="{borderColor:tItem.selectColor}" class="theme-tick"></div>
        </div>
      </div>
      <div>
        <span>{{ $t('setting.tagsView') }}</span>
        <scx-switch v-model="tagsView" class="drawer-switch"/>
      </div>
      <div>
        <span>{{ $t('setting.sidebarLogo') }}</span>
        <scx-switch v-model="sidebarLogo" class="drawer-switch"/>
      </div>
      <div>
        <span>{{ $t('setting.lowSpecialEffect') }}</span>
        <scx-switch v-model="lowSpecialEffect" class="drawer-switch"/>
      </div>
      <div>
        <span><scx-icon icon="jigsaw"/>:  {{ $t('setting.layoutMode') }}</span>
      </div>
      <div style="flex-wrap:wrap;margin-bottom: 0;">
        <div v-for="(items,index) in layoutModes" class="theme-item" @click="layoutMode=items">
          <div v-show="items!=='horizontal'"
               :style="{backgroundColor: themes.filter(t=>theme===t.theme)[0].leftColor}"></div>
          <div :style="{background: themes.filter(t=>theme===t.theme)[0].mainColor}">
            <div v-show="items!=='vertical'"
                 :style="{backgroundColor: themes.filter(t=>theme===t.theme)[0].topColor}"></div>
          </div>
          <div v-if="layoutMode===items" :style="{borderColor:themes.filter(t=>theme===t.theme)[0].selectColor}"
               class="theme-tick"></div>
        </div>
      </div>
      <div>
        <span><scx-icon icon="format-painter"/>:  {{ $t('setting.mainTransitionAnimation') }}</span>
      </div>
      <div style="flex-wrap:wrap;margin-bottom: 0">
        <div v-for="(aItem,index) in mainTransitionAnimations" :class="aItem.value+'-right-item'"
             :style="{background: themes.filter(t=>theme===t.theme)[0].mainColor,borderColor:themes.filter(t=>theme===t.theme)[0].leftColor}"
             @click="mainTA=aItem.value">
          <span :style="{color: themes.filter(t=>theme===t.theme)[0].selectColor}"
                style="margin-left: 5%;font-weight: 600">{{ $t(aItem.name) }}</span>
          <div v-if="mainTA===aItem.value" :style="{borderColor:themes.filter(t=>theme===t.theme)[0].selectColor}"
               class="theme-tick"></div>
        </div>
      </div>
      <div style="justify-content:flex-end">
        <el-button type="text" @click="resetAllSetting">重置为默认状态</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {changeSetting, state} from "../../store";
import {computed, ref, watch} from "vue";
import scxConfig from "../../../scx.config";
import './index.css';

export default {
  name: 'RightPanel',
  setup() {
    //主题的列表
    const themes = [{
      theme: ' ',
      leftColor: 'rgb(24, 144, 255)',
      topColor: 'rgba(24, 144, 255,0.4)',
      mainColor: 'rgba(24, 144, 255,0.2)',
      selectColor: 'rgb(24, 144, 255)'
    },
      {
        theme: 'red',
        leftColor: 'rgb(228, 54, 54)',
        topColor: 'rgba(228, 54, 54, 0.4)',
        mainColor: 'rgba(228, 54, 54, 0.2)',
        selectColor: 'rgb(228, 54, 54)'
      },
      {
        theme: 'green',
        leftColor: '#277911',
        topColor: 'rgba(39, 121, 17,0.4)',
        mainColor: 'rgba(39, 121, 17,0.2)',
        selectColor: '#277911'
      },
      {
        theme: 'purple',
        leftColor: 'rgb(255, 153, 153)',
        topColor: 'rgba(255, 255, 255, 0.3)',
        mainColor: 'linear-gradient(to bottom right, rgb(255, 153, 153), rgb(78, 197, 212))',
        selectColor: '#004d99'
      },
      {theme: 'dark', leftColor: '#3c3f41', topColor: '#000000', mainColor: '#6b6f77', selectColor: '#def0de'},
      {theme: 'windows', leftColor: '#032b45', topColor: '#114c3b', mainColor: '#b4b4b4', selectColor: '#3292cf'}];

    const layoutModes = ['vertical', 'horizontal', 'split'];

    //过渡动画的列表
    const mainTransitionAnimations = [{name: 'setting.enlarge', value: 'enlarge'}, {
      name: 'setting.fade',
      value: 'fade'
    }, {name: 'setting.threeDRotate', value: 'threeDRotate'}];

    const showRightPanel = ref(false);

    function closeSidebar(evt) {
      const parentA = evt.target.closest('.scx-right-panel');
      const parentB = evt.target.closest('.scx-right-panel-handle-button');
      if (!parentA && !parentB) {
        showRightPanel.value = false;
        window.removeEventListener('click', closeSidebar)
      }
    }

    const tagsView = computed({get: () => state.setting.tagsView, set: (value) => changeSetting('tagsView', value)});
    const sidebarLogo = computed({
      get: () => state.setting.sidebarLogo,
      set: (value) => changeSetting('sidebarLogo', value)
    })
    const lowSpecialEffect = computed({
      get: () => state.setting.lowSpecialEffect,
      set: (value) => changeSetting('lowSpecialEffect', value)
    })
    const theme = computed({get: () => state.setting.theme, set: (value) => changeSetting('theme', value)})
    const mainTA = computed({
      get: () => state.setting.mainTransitionAnimation,
      set: (value) => changeSetting('mainTransitionAnimation', value)
    })
    const layoutMode = computed({
      get: () => state.setting.layoutMode,
      set: (value) => changeSetting('layoutMode', value)
    })


    watch(showRightPanel, (value) => {
      value && setTimeout((e) => window.addEventListener('click', closeSidebar), 250)
    })

    function resetAllSetting() {
      for (let defaultSettingKey in scxConfig.defaultSetting) {
        changeSetting(defaultSettingKey, scxConfig.defaultSetting[defaultSettingKey]);
      }
    }

    const dragEvent = {
      onClick: (el) => {
        showRightPanel.value = !showRightPanel.value
      },
      onDragStart: (el) => {
        el.classList.add('dragging');
      },
      onCancelDrag: (el) => {
        el.style.left = document.documentElement.clientWidth - el.offsetWidth + 'px';
      },
      onDragEnd: (el) => {
        el.classList.remove('dragging');
        el.style.left = 'unset'
      }
    }

    return {
      themes,
      mainTransitionAnimations,
      showRightPanel,
      closeSidebar,
      tagsView,
      mainTA,
      sidebarLogo,
      lowSpecialEffect,
      theme,
      layoutMode,
      resetAllSetting,
      scxConfig,
      dragEvent,
      layoutModes
    }
  }
}
</script>