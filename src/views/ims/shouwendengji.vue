<template>
  <div>
    <scx-crud :scx-add-buttons="addButtonData" :scx-crud-config="tableConfig" :scx-crud-items="tableData"/>
    <el-dialog :visible.sync="downloadExcelDialogFormVisible"
               title="导出统计数据">
      <div class="batchDeleteMessage">请选择统计的季度 !!!</div>
      <el-form :inline="false"
               label-position="right"
               label-width="100px">
        <el-form-item label="季度:">
          <el-select
              v-model="downloadExcelTime"
              clearable
              filterable
              style="width:250px"
          >
            <el-option label="第一季度" value="1"/>
            <el-option label="第二季度" value="2"/>
            <el-option label="第三季度" value="3"/>
            <el-option label="第四季度" value="4"/>
            <el-option label="第一季度和第二季度" value="1-2"/>
            <el-option label="第二季度和第三季度" value="2-3"/>
            <el-option label="第三季度和第四季度" value="3-4"/>
            <el-option label="第一至第三季度" value="1-2-3"/>
            <el-option label="第二至第四季度" value="2-3-4"/>
            <el-option label="全年" value="1-2-3-4"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary"
                   @click="downloadExcel()">
          {{ $t('table.confirmNoSpace') }}
        </el-button>
        <el-button @click="downloadExcelDialogFormVisible = false">
          {{ $t('table.cancelNoSpace') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../utils/request";
import scxConfig from "../../../scx.config";

export default {
  name: 'shouwendengji',
  data() {
    return {
      addButtonData: [
        {label: '导出统计Excel', type: 'doSomeThing', doSomeThing: this.showDownload},
      ],
      tableConfig: {
        modelName: 'Shouwendengji',//此处表示 页面 的国际化之类的
        editShow: 'wenjianbiaoti',
        module: 'ims',
        labelWidth: '200px',
        dialogWidth: '90%',
        //添加按钮的下拉选配置 注意!!! 若全部为 false 则 添加按钮会由下拉框按钮变为 普通的按钮
        //在添加按钮中 是否有 Excel 下载模板功能
        hasExcelDownloadTemplateButton: false,
        //在添加按钮中 是否有 Excel 导入功能
        hasExcelImport: false,
      },
      tableData: [
        {
          label: '文件编号',
          prop: 'wenjianbianhao', isFilter: true,
          width: '150px',
          type: 'number',
          showFlag: ['update'],
          rules: {required: true, trigger: 'blur', isUnique: true}
        },
        {
          label: '来文期数',
          prop: 'laiwenqishu', isFilter: true,
          width: '150px',
          type: 'number'
        },
        {
          prop: 'shouwenriqi', isFilter: true,
          label: '收文日期',
          width: '150px',
          type: 'date',
          filterWidth: '320px',
          defaultValue: this.getShouwenriqi(),
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'laiwenshijian', isFilter: true,
          label: '来文时间',
          width: '150px',
          filterWidth: '320px',
          type: 'date',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '来文单位',
          prop: 'laiwendanwei', isFilter: true,
          width: '190px',
          type: 'select',
          selectOption: ["延边支队", "白山支队", "通化支队", "长白山支队", "临江边检", "圈河边检", "集安边检", "图们边检", "长白边检", "沙坨子边检", "南坪边检", "长春边检", "延吉边检", "珲春边检", "古城里边检", "开山屯边检", "三合边检"],
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '来文类型',
          prop: 'laiwenleixing', isFilter: true,
          width: '120px',
          type: 'select',
          selectOption: ['信息', '专题', '原文实物', '视频图片', '声像情报'],
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '获取途径',
          prop: 'huoqutujing', isFilter: true,
          type: 'select',
          selectOption: ['网络侦收', '边防检查', '外事', '签证', '辖区走访', '拘留审查', '边境观察', '交流协作', '秘密力量', '专项审查', '原文实物', '综合专题', '声像情报', '其他'],
          width: '120px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '获取途径(其他)分数',
          prop: 'huoqutujingqitafenshu',
          type: 'number',
          width: '170px',
        },
        {
          label: '秘密力量编号',
          prop: 'mimililiangbianhao', isFilter: true, maxlength: 100,
          showOverflowTooltip: true,
          width: '150px',
        },
        {
          label: '研判人员',
          prop: 'yanpanrenyuan', isFilter: true, maxlength: 100,
          showOverflowTooltip: true,
          width: '300px',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '文件标题',
          prop: 'wenjianbiaoti', isFilter: true, maxlength: 500,
          showOverflowTooltip: true,
          width: '300px',
          //控制这个input 显示在一行
          inline: true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '以下为采用情况',
          type: 'html',
          inline: true,
          html: '<hr style="width: 650px"/>'
        },
        {
          label: '总站采编类型',
          prop: 'zongzhancaibianleixing', isFilter: true, maxlength: 200,
          showOverflowTooltip: true,
          width: '150px',
        },
        {
          label: '总站采用',
          prop: 'zongzhancaiyongfenshu',
          width: '150px',
          type: 'number',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '省直单位采用',
          prop: 'shengzhidanweicaiyong',
          width: '150px',
          type: 'switch',
          excelFormat: (o) => o.shengzhidanweicaiyong ? (o.zongzhancaiyongfenshu / 10.0) * 15 : 0,
          tableLabelFormat: (o) => o.shengzhidanweicaiyong ? (o.zongzhancaiyongfenshu / 10.0) * 15 : 0,
          defaultValue: false,
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '省部级单位采用',
          prop: 'shengbujidanweicaiyong',
          type: 'switch',
          width: '150px',
          excelFormat: (o) => o.shengbujidanweicaiyong ? (o.zongzhancaiyongfenshu / 10.0) * 30 : 0,
          tableLabelFormat: (o) => o.shengbujidanweicaiyong ? (o.zongzhancaiyongfenshu / 10.0) * 30 : 0,
          defaultValue: false,
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '是否核心情报',
          prop: 'shifouhexinqingbao',
          type: 'switch',
          width: '150px',
          excelFormat: (o) => o.shifouhexinqingbao ? (o.zongzhancaiyongfenshu / 10.0) * 50 : 0,
          tableLabelFormat: (o) => o.shifouhexinqingbao ? (o.zongzhancaiyongfenshu / 10.0) * 50 : 0,
          defaultValue: false,
        },
        {
          label: '总站领导批示',
          prop: 'zongzhanlingdaopishi',
          type: 'switch',
          width: '200px',
          excelFormat: (o) => o.zongzhanlingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 20 : 0,
          tableLabelFormat: (o) => o.zongzhanlingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 20 : 0,
          defaultValue: false,
        },
        {
          label: '省厅领导批示',
          prop: 'shengtinglingdaopishi',
          type: 'switch',
          width: '150px',
          excelFormat: (o) => o.shengtinglingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 30 : 0,
          tableLabelFormat: (o) => o.shengtinglingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 30 : 0,
          defaultValue: false,
        },
        {
          label: '副省部级领导批示',
          prop: 'fushengbujilingdaopishi',
          type: 'switch',
          width: '200px',
          excelFormat: (o) => o.fushengbujilingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 40 : 0,
          tableLabelFormat: (o) => o.fushengbujilingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 40 : 0,
          defaultValue: false,
        },
        {
          label: '正省部级领导批示',
          prop: 'zhengshengbujilingdaopishi',
          type: 'switch',
          width: '170px',
          excelFormat: (o) => o.zhengshengbujilingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 50 : 0,
          tableLabelFormat: (o) => o.zhengshengbujilingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 50 : 0,
          defaultValue: false,
        },

        {
          label: '中央领导批示',
          prop: 'zhongyanglingdaopishi',
          type: 'switch',
          excelFormat: (o) => o.zhongyanglingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 100 : 0,
          tableLabelFormat: (o) => o.zhongyanglingdaopishi ? (o.zongzhancaiyongfenshu / 10.0) * 100 : 0,
          width: '150px', defaultValue: false,

        },
        {
          prop: 'pishineirong', isFilter: true, maxlength: 500,
          width: '120px',
          showOverflowTooltip: true,
          type: 'textarea',
        },
        {
          prop: 'beizhu', isFilter: true, maxlength: 500,
          showOverflowTooltip: true,
          type: 'textarea',
          width: '100px',
        },
        {
          label: '指令性专题',
          prop: 'zhilingxingzhuanti',
          type: 'number',
          width: '120px',
        },
        {
          label: '重要情报',
          prop: 'zhongyaoqingbao',
          type: 'number',
          defaultValue: 0,
          width: '120px',
        },
        {
          label: '案件线索',
          prop: 'anjianxiansuo',
          type: 'number',
          defaultValue: 0,
          width: '120px',
        },
        {
          label: '其他加分',
          prop: 'qitajiafen',
          type: 'number',
          defaultValue: 0,
          width: '120px',
        },
        {
          label: '冒用充数',
          prop: 'maoyongchongshu',
          type: 'switch',
          defaultValue: false,
          width: '120px',
        },
        {
          label: '虚假情报',
          prop: 'xujiaqingbao',
          type: 'number',
          defaultValue: 0,
          width: '120px',
        },
        {
          label: '其他减分',
          type: 'number',
          defaultValue: 0,
          prop: 'qitajianfen',
          width: '120px',
        }
      ],
      downloadExcelDialogFormVisible: false,
      downloadExcelTime: '',
    }
  }, methods: {
    getShouwenriqi() {
      var a = new Date()
      var month = a.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var date = a.getDate()
      if (date < 10) {
        date = '0' + date
      }
      return a.getFullYear() + '-' + month + '-' + date;
    },
    downloadExcel() {
      var data = {downloadExcelTime: this.downloadExcelTime}
      request.post('/api/shouwendengji/downloadExcel', data).then(res => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none"; // 防止影响页面
        iframe.style.height = '0'; // 防止影响页面
        iframe.src = scxConfig.baseApi + '/base/download/' + res.filename;
        document.body.appendChild(iframe);
        this.downloadExcelDialogFormVisible = false
      })
    }, showDownload() {
      this.downloadExcelDialogFormVisible = true
    }
  }
}
</script>

