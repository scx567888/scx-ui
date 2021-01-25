<template>
  <div style="display: flex">
    <scx-tree :scx-tree-config="leftTreeConfig" style="width: 30%"/>
    <scx-crud ref="table" :scx-add-buttons="addButtonData" :scx-crud-config="scxTableConfig" :scx-crud-items="tableData"
              style="width: 100%"/>
    <el-dialog :visible.sync="visible" title="导入" width="30%">
      <el-upload :before-upload="beforeUpdate" :headers="tokenHeader"
                 :on-error="onError" :on-success="onSuccess"
                 :show-file-list="false" action="http://localhost:8080/api/attendance/importAttendance" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<style>
.el-upload-dragger, .el-upload {
  width: 100%;
}
</style>
<script>
import request from "/@/utils/request";
import {getToken} from "../../utils/permUtil";

var token = getToken()
export default {
  name: 'attendanceList',
  data() {
    return {
      userList: [],
      deptList: [],
      tokenHeader: {'S-Token': token},
      visible: false,
      addButtonData: [{
        label: '导入',
        type: 'doSomeThing',
        doSomeThing: () => {
          this.visible = true
        }
      }, {
        label: '清空',
        colorType: 'warning',
        type: 'doSomeThing',
        icon: '',
        doSomeThing: () => {
          this.$confirm('是否要清空所有数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            request.get("/api/attendance/clear").then(res => {
              this.$refs.table.getList();
            })
          }).catch(() => {

          });
        }
      }],
      scxTableConfig: {
        //右侧 的 model 名称
        modelName: 'Attendance',
        editShow: 'name',
        tableType: 'leftTreeAndTable',
        listApi: '/api/attend/attendance/list',
        hasCreateButton: false,
        hasUpdateButton: false,
        hasDeleteButton: false,
        hasBatchDelete: false
      },
      leftTreeConfig: {
        buildUrl: '/api/core/user/listSubDept',
        topLabel: '处室',
        editName: 'label',
        editShow: 'label',
        labelFun: (o) => o.label,
        onClick: this.leftTreeOnClick,
        showOperation: false,
        defaultExpandedKeys: [41]
      },
      tableData: [{
        prop: 'name',
        isFilter: true,
        excelFormat: this.nameFormat,
        tableLabelFormat: this.nameFormat,
        label: '姓名'
      }, {
        prop: 'idcard',
        label: '证件号'
      }, {
        prop: 'deptName',
        excelFormat: this.deptNameFormat,
        tableLabelFormat: this.deptNameFormat,
        label: '处室',
      }, {
        prop: 'clockInDate',
        isFilter: true,
        type: 'date',
        label: '日期',
        excelFormat: this.clockInDateFormat,
        tableLabelFormat: this.clockInDateFormat,
        filterWidth: '300px'
      }, {
        prop: 'morning',
        excelFormat: this.morningFormat,
        tableLabelFormat: this.morningFormat,
        label: '上班'
      }, {
        prop: 'afternoon',
        excelFormat: this.afternoonFormat,
        tableLabelFormat: this.afternoonFormat,
        label: '下班'
      }, {
        prop: 'total',
        excelFormat: this.totalFormat,
        tableLabelFormat: this.totalFormat,
        label: '上班时间'
      }]
    }
  },
  methods: {
    beforeUpdate() {
      this.visible = false;
      this.loading = this.$loading({
        lock: true,
        text: '导入中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    onSuccess(response, file, fileList) {
      this.$refs.table.getList();
      this.loading.close();
    },
    onError(err, file, fileList) {
      console.log(err)
    },
    leftTreeOnClick(nowNodeData, listQuery) {
      //顶级菜单
      if (nowNodeData === -1) {
        listQuery.deptId = ''
      } else {
        if (nowNodeData.id === 41) {
          listQuery.deptId = ''
        } else {
          listQuery.deptId = nowNodeData.id
        }
      }
      listQuery.page = 1
      return listQuery
    },
    nameFormat(o) {
      var a = this.userList.filter(d => o.name == d.id);
      if (a[0]) {
        return a[0].realName
      } else {
        return "-"
      }
    },
    clockInDateFormat(o) {
      var now = new Date(o.clockInDate.substring(0, 10));
      var day = now.getDay();
      var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      return o.clockInDate.substring(0, 10) + " " + weeks[day];
    },
    morningFormat(o) {
      if (o.morning === '' || o.morning === null) {
        return ''
      }
      return o.morning.substring(10, 19)
    },
    afternoonFormat(o) {
      if (o.afternoon === '' || o.afternoon === null) {
        return ''
      }
      return o.afternoon.substring(10, 19)
    },
    totalFormat(o) {
      if (o.afternoon === '' || o.morning === '' || o.afternoon === null || o.morning === null) {
        return ''
      }
      var date1 = new Date(o.afternoon)
      var date2 = new Date(o.morning)
      var s1 = date1.getTime();
      var s2 = date2.getTime();
      var total = (s1 - s2) / 1000;
      var theTime;
      if (total < 0) {
        theTime = parseInt(total * -1);// 秒
      } else {
        theTime = parseInt(total);// 秒
      }
      var middle = 0;// 分
      var hour = 0;// 小时
      if (theTime > 60) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (middle > 60) {
          hour = parseInt(middle / 60);
          middle = parseInt(middle % 60);
        }
      }
      var result = "" + parseInt(theTime) + "秒";
      if (middle > 0) {
        result = "" + parseInt(middle) + "分" + result;
      }
      if (hour > 0) {
        result = "" + parseInt(hour) + "小时" + result;
      }
      if (total < 0) {
        return "-" + result;
      }
      return result
    },
    deptNameFormat(o) {
      var a = this.userList.filter(d => o.name == d.id);
      if (a[0]) {
        var deptIdsList = a[0].deptIds.split(",")
        var b = this.deptList.filter(d => deptIdsList.includes(d.id + ''))
        var v = b.map(t => t.deptName)
        return v.join(",");
      } else {
        return "-"
      }
    }
  },
  created() {
    request.post("/api/core/User/list", {}).then(o => {
      this.userList = o.items
    })
    request.post("/api/core/Dept/list", {}).then(o => {
      this.deptList = o.items
    })
  },
  activated() {
    request.post("/api/core/User/list", {}).then(o => {
      this.userList = o.items
    })
    request.post("/api/core/Dept/list", {}).then(o => {
      this.deptList = o.items
    })
  }
}
</script>
