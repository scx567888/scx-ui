<template>
  <scx-crud :scx-crud-config="crudConfig" :scx-crud-items="crudItems"/>
</template>

<script>
import {checkIdCard, checkPhoneNumber} from "/@/utils/constant/rules"; // 这里获取身份证和密码的校验方法
import {getNation} from "/@/utils/constant/nation"; // 这里获取民族的下拉选数据
export default {
  name: 'UserManage',
  data() {
    return {
      crudConfig: {
        modelName: 'user',
        editShow: 'username',
        module: 'core'
      },
      crudItems: [
        {
          prop: 'username',
          tableWidth: '200px',
          isFilter: true,
          maxlength: 10,
          disableInEdit: true,
          createPlaceholder: '请输入用户名',
          rules: {required: true, trigger: 'blur', isUnique: true}
        },
        {
          prop: 'password',
          type: 'password',
          maxlength: 15,
          noShowInTable: true,
          noShowValueInEdit: true,
          createPlaceholder: '请输入密码',
          editPlaceholder: '留空则不修改',
          rules: {required: true, trigger: 'change', checkFlag: ['create']}
        },
        {
          prop: 'idCard',
          tableWidth: '180px',
          maxlength: 18,
          createPlaceholder: '请输入身份证号',
          showOverflowTooltip: true,
          isFilter: true,
          rules: {required: true, trigger: 'change', validator: checkIdCard}
        },
        {
          createPlaceholder: '请输入昵称',
          prop: 'realName', tableWidth: '150px', isFilter: true, maxlength: 10,
          rules: {required: true, message: '昵称不能为空', trigger: 'change'}
        },
        {
          createPlaceholder: '请输入电话号码',
          prop: 'phoneNumber',
          tableWidth: '170px',
          maxlength: 11,
          rules: {required: true, trigger: 'change', validator: checkPhoneNumber}
        },
        {
          prop: 'nativePlace',
          tableWidth: '170px',
          //使用 region 会导致 页面卡顿 慎用
          type: 'region',
          noShowInTable: false,
          placeholder: '选择籍贯',
          rules: {required: true, message: '籍贯不能为空', trigger: 'change'}
        },
        {
          prop: 'sex',
          tableWidth: '80px',
          type: 'select',
          isFilter: true,
          option: [{color: '#f39f0c', label: '男'}, {color: '#0e53cb', label: '女'}],
          placeholder: '选择性别'
        },
        {
          prop: 'userAge',
          tableWidth: '120px',
          type: 'number',
          minNumber: 0,
          maxNumber: 120,
          label: '年龄',
          defaultValue: 0,
          hasSort: true
        },
        {
          prop: 'userRank',
          tableWidth: '120px',
          type: 'number',
          minNumber: -22,
          maxNumber: 99,
          defaultValue: 0,
          rules: {required: true, message: '用户级别不能为空', trigger: 'change'}
        },
        {
          prop: 'superAdmin', type: 'switch', maxlength: 10,
          tableWidth: '100px',
          defaultValue: false
        },
        {
          prop: 'roleIds',
          // type: 'select',
          type: 'tree',
          showCheckbox: true,
          collapseOpen: false,
          isFilter: true,
          buildUrl: '/api/role/list',
          labelProp: 'roleName',
          valueProp: 'id',
          noShowInTable: true
        },
        {
          prop: 'deptIds',
          // type: 'select',
          type: 'tree',
          showCheckbox: true,//是否显示 checkbox 默认不显示
          collapseOpen: false,
          isFilter: true,
          buildUrl: '/api/dept/list',
          labelProp: 'deptName',
          valueProp: 'id',
          noShowInTable: true
        },
        {prop: 'birthDate', tableWidth: '120px', type: 'date', placeholder: '选择出生日期'},
        {
          prop: 'nation', tableWidth: '100px',
          type: 'select',
          option: getNation(),
        },
        {prop: 'job', tableWidth: '100px'},
        {
          prop: 'education',
          tableWidth: '100px',
          type: 'select',
          option: ['无', '小学以下', '初中', '高中', '专科', '本科', '硕士研究生', '博士研究生', '其他'],
          placeholder: '选择学历',
          noShowInTable: true
        },
        {
          prop: 'userType',
          defaultFilterValue: 0,
          defaultValue: 0,
          noShowInTable: true,
          showFlag: [],
        }
      ]
    }
  }
}
</script>

