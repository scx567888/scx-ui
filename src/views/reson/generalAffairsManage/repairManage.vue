<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-table-data="tableData"/>
</template>

<script>
import {getNation} from "/@/utils/constant/nation"; // 这里获取民族的下拉选数据
import {checkIdCard, checkPhoneNumber} from "/@/utils/constant/rules"; // 这里获取身份证和密码的校验方法
export default {
  name: 'StudentInfo',
  data() {
    return {
      tableConfig: {
        modelName: 'Student',
        apiModelName: 'User',
        editShow: 'studentName',
        // //此处是页面配置项 的参考 其余页面若有相关需求全部按照此配置项进行配置
        // //是否有添加按钮
        // hasCreateButton: true,
        // //是否有查询项
        // hasQueryOperation: false,
        // //是否有更新按钮 注意 如果此两项 都为 false 则不显示 操作 并覆盖掉 hasTableOperation 的设置
        hasUpdateButton: true,
        // //是否有删除按钮
        hasDeleteButton: true,
        // //是否有右键菜单
        // hasRightClickMenu: false,
        // //是否有表格右侧的 操作列 注意 此项不控制 右键菜单的 删除 与编辑
        // hasTableOperation: false,
        // //是否有多选按钮
        // hasMultiSelectButton: false,
        // //是否有分页组件 注意若不显示分页 则列表会一次查询出来
        // hasPagination: false,
        // //是否有 批量删除 此项同时控制 下方的批量删除按钮 和键盘的delete 快捷键 (如果 hasShortcutKeys 为 true)
        // hasBatchDelete: false,
        // //是否有键盘快捷键
        // hasShortcutKeys: true,
        // //添加按钮的下拉选配置 注意!!! 若全部为 false 则 添加按钮会由下拉框按钮变为 普通的按钮
        // //在添加按钮中 是否有 Excel 下载模板功能
        // hasExcelDownloadTemplateButton: false,
        // //在添加按钮中 是否有 Excel 导入功能
        // hasExcelImport: false,
        // //在添加按钮中 是否有 Excel 下载当前页面功能
        // hasExcelDownloadNowDisabled: false,
        // //在添加按钮中 是否有 Excel 下载过滤条件功能
        // hasExcelDownloadNowFilterDisabled: false,
        // //在添加按钮中 是否有 Excel 全部导出
        // hasExcelDownloadAllDisabled: false,
      },
      tableData: [
        {
          prop: 'password',
          type: 'password',
          maxlength: 15,
          noShowInTable: true,
          noShowValueInEdit: true,
          noCheckInEdit: true,
          createPlaceholder: '请输入密码',
          editPlaceholder: '留空则不修改',
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'studentName', width: '100px', isFilter: true,
          rules: {required: true, trigger: 'change'}
        },
        {
          prop: 'deptName', width: '120px', isFilter: true,
        },
        {
          prop: 'idCard', width: '180px', isFilter: true,
          showOverflowTooltip: true,
          filterWidth: '150px',
          rules: {required: true, validator: checkIdCard}
        },
        {prop: 'birthDate', width: '120px', type: 'date', placeholder: '选择出生日期'},
        {
          prop: 'sex',
          width: '100px',
          type: 'select',
          selectOption: ['男', '女'],
          placeholder: '选择性别',
          defaultValue: '男'
        },
        {
          prop: 'nation', width: '100px',
          type: 'select',
          selectOption: getNation(),
        },
        {prop: 'job', width: '100px'},
        {
          prop: 'education',
          width: '100px',
          showOverflowTooltip: true,
          type: 'region',
          placeholder: '选择户籍',
          rules: {required: true}
        },
        {
          prop: 'phoneNumber', rules: {required: true, validator: checkPhoneNumber}
        },
        {
          prop: 'userType',
          isHiddenFilter: 2,
          defaultValue: 2,
          noShowInTable: true,
          showFlag: [],
        }]
    }
  }
}
</script>
