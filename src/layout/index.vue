<template>
  <!--整个区块-->
  <div class="scx-basic-layout">
    <!-- 垂直导航栏   -->
    <vertical-menu/>
    <!-- 主区域-->
    <div class="scx-main">
      <!-- 上方标题栏 -->
      <navbar/>
      <!-- 多标签页 -->
      <tags-view/>
      <!-- 内容容器 -->
      <app-main/>
    </div>
    <!-- 右侧操作菜单 -->
    <right-panel/>
  </div>
</template>

<script>
import RightPanel from './RightPanel/index.vue'
import AppMain from './AppMain/index.vue'
import Navbar from './Navbar/index.vue'
import VerticalMenu from './Menu/Vertical/index.vue'
import TagsView from './TagsView/index.vue'
import './index.css'

export default {
  name: 'Layout',
  components: {AppMain, Navbar, RightPanel, TagsView, VerticalMenu}
}
</script>
