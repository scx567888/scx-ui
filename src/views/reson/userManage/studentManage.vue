<template>
  <scx-crud :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
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
        listApi: '/api/core/User/list',
        createApi: '/api/core/User',
        deleteApi: '/api/core/User',
        revokeDeleteApi: '/api/core/User/revokeDelete',
        checkUniqueApi: '/api/core/User/list',
        updateApi: '/api/core/User',
        autoCompleteApi: '/api/core/User/list',
      },
      tableData: [
        {
          prop: 'username', width: '100px', isFilter: true,
          label: '学生名称',
          rules: {required: true, trigger: 'change'}
        },
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
          option: ['男', '女'],
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
          defaultFilterValue: 1,
          defaultValue: 1,
          noShowInTable: true,
          showFlag: [],
        }]
    }
  }
}
</script>
