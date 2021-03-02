<template>
  <scx-crud ref="myTable"
            :scx-add-button-data="addButtonData"
            :scx-crud-config="tableConfig"
            :scx-customize-temp="customizeTemp"
            :scx-edit-button-data="editButtonData"
            :scx-table-data="tableData"
  />
</template>
<script type="text/jsx">

export default {
  name: 'NoticeAnnouncement',
  data() {
    return {
      sendType: 0,//0是发送给所有用户 1 只是发送给在线用户
      tableConfig: {
        modelName: 'Notice',//实体类的名称  用于构建 Api 和国际化
        dialogWidth: '50%',//弹出框的宽度 默认50%
        hasCreateButton: false,//是否有添加按钮
        hasExcelDownloadNowDisabled: false,
        hasExcelDownloadNowFilterDisabled: false,
        hasExcelDownloadAllDisabled: false,
      },
      addButtonData: [//添加按钮右侧下拉选的拓展数据 用于实现更多功能
        {
          label: '发送通知', type: 'doSomeThing',
          isDropDown: false,
          doSomeThing: () => this.sendForAllUser(),
          colorType: 'success'
        },
        {
          label: '发送(只包括在线)', type: 'doSomeThing',
          doSomeThing: () => this.sendForOnlineUser(),
          isDropDown: false,
        },
      ],
      editButtonData: [
        {
          label: '查看异常',
          isShow: (o) => {
            return !o.jiekoufashengyichang
          },
          color: 'success',
          doSomeThing: (o) => console.log(o)
        }
      ],
      tableData: [
        {label: '标题', prop: 'title'},
        {label: '内容', prop: 'content', type: 'tinymce'},
        {
          label: '接受的用户',
          prop: 'userIds',
          type: 'tree',
          buildUrl: '/api/User/list',
          valueProp: 'id',
          labelProp: 'username'
        },
        {
          label: '接受的角色',
          prop: 'roleIds',
          // type: 'select',
          type: 'tree',
          showCheckbox: true,
          collapseOpen: false,
          isFilter: true,
          buildUrl: '/api/Role/list',
          labelProp: 'roleName',
          valueProp: 'id',
          noShowInTable: true
        },
        {
          label: '接受的部门',
          prop: 'deptIds',
          // type: 'select',
          type: 'tree',
          showCheckbox: true,//是否显示 checkbox 默认不显示
          collapseOpen: false,
          isFilter: true,
          buildUrl: '/api/Dept/list',
          labelProp: 'deptName',
          valueProp: 'id',
          noShowInTable: true
        },
      ]
    }
  },
  methods: {
    sendForAllUser() {
      this.sendType = 0
      this.$refs['myTable'].handleCreate('create', 'table')
    },
    sendForOnlineUser() {
      this.sendType = 1
      this.$refs['myTable'].handleCreate('create', 'table')
    },
    customizeTemp(o) {
      o.sendType = this.sendType
      return o;
    }
  }
}
</script>
