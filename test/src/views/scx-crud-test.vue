<template>
  <scx-crud>

    <!-- 左侧添加按钮及下拉选 -->
    <template #header-left>
      <button type="button">添加</button>
      <button type="button">导入</button>
      <button type="button">导出</button>
    </template>

    <!-- 右侧查询项及搜索按钮 -->
    <template #header-right>
      <input placeholder="请输入姓名">
      <input pattern="请输入年龄" type="number">
      <button type="button">搜索</button>
      <button type="button">重置</button>
    </template>

    <!-- 主部分 -->
    <template #main>
      <div style="overflow: auto;max-height: 550px;width: 100%;border: 1px solid black">
        <table style="width: 100%;text-align: center;">
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>家庭住址</th>
            <th>操作</th>
          </tr>
          <tr v-for="i in data">
            <td>{{ i.name }}</td>
            <td>{{ i.age }}</td>
            <td>{{ i.address }}</td>
            <td>
              <button type="button">编辑</button>
              <button type="button">删除</button>
            </td>
          </tr>
        </table>
      </div>

    </template>

    <!-- 底部 -->
    <template #footer>
      <button type="button">批量删除</button>
      <span>假的分页插件 1, 2, 3, 4, 5, 6, 7</span>
    </template>

    <!-- 添加及编辑框 -->
    <h1>其他元素</h1>

  </scx-crud>
</template>

<script setup>

const data = [];

for (let i = 0; i < 99; i++) {
  data.push({
    name: '小明_' + i,
    age: i,
    address: '花园小区_' + i
  })
}

</script>