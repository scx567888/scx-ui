<template>
  <div class="scx-crud">
    <!-- 头部 -->
    <header v-if="$slots['header-left']||$slots['header-right']" class="scx-crud-header">
      <!-- 头部左侧 (一般放操作项 如 : 添加按钮 , 导出按钮) -->
      <div class="scx-crud-header-left">
        <slot name="header-left"/>
      </div>
      <!-- 头部右侧 (一般放查询项) -->
      <div class="scx-crud-header-right">
        <slot name="header-right"/>
      </div>
    </header>

    <!-- 主内容区 一般放一个表格 -->
    <main v-if="$slots['main']" class="scx-crud-main">
      <slot name="main"/>
    </main>

    <!-- 底部内容区 一般放分页或批量删除按钮 (远离顶部防止误操作) -->
    <footer v-if="$slots['footer']" class="scx-crud-footer">
      <slot name="footer"/>
    </footer>

    <!-- 自定义的内容 -->
    <slot/>

  </div>
</template>

<script>
import './index.css'

export default {
  name: "scx-crud"
}
</script>