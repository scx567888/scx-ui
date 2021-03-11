<template>
  <div>
    <scx-table :scxTableConfig="tableConfig" :tableData="tableData" :addButtonData="addButtonData"/>
    <el-dialog title="导出统计数据"
               :visible.sync="downloadExcelDialogFormVisible">
      <div class="batchDeleteMessage">请选择统计的季度 !!!</div>
      <div id="downloadDiv">
        <el-link type="primary" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=1'">第一季度</el-link>
        <el-link type="primary" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=2'">第二季度</el-link>
        <el-link type="primary" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=3'">第三季度</el-link>
        <el-link type="primary" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=4'">第四季度</el-link>
        <br>
        <el-link type="success" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=1-2'">第一季度和第二季度
        </el-link>
        <el-link type="success" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=2-3'">第二季度和第三季度
        </el-link>
        <el-link type="success" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=3-4'">第三季度和第四季度
        </el-link>
        <el-link type="success" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=1-2-3'">第一至第三季度
        </el-link>
        <el-link type="success" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=2-3-4'">第二至第四季度
        </el-link>
        <br>
        <el-link type="warning" :href="aaaa+'/api/shouwendengji/downloadExcel?downloadExcelTime=1-2-3-4'">全年</el-link>
      </div>

      <!--          <el-select-->
      <!--              filterable-->
      <!--              clearable-->
      <!--              style="width:250px"-->
      <!--              v-model="downloadExcelTime"-->
      <!--          >-->
      <!--            <el-option label="第一季度" value="1"/>-->
      <!--            <el-option label="第二季度" value="2"/>-->
      <!--            <el-option label="第三季度" value="3"/>-->
      <!--            <el-option label="第四季度" value="4"/>-->
      <!--            <el-option label="第一季度和第二季度" value="1-2"/>-->
      <!--            <el-option label="第二季度和第三季度" value="2-3"/>-->
      <!--            <el-option label="第三季度和第四季度" value="3-4"/>-->
      <!--            <el-option label="第一至第三季度" value="1-2-3"/>-->
      <!--            <el-option label="第二至第四季度" value="2-3-4"/>-->
      <!--            <el-option label="全年" value="1-2-3-4"/>-->
      <!--          </el-select>-->


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
import ScxTable from "@/components/ScxTable/index";
import scxConfig from "../../scxconfig";

export default {
  name: 'shouwendengji',
  components: {ScxTable},
  data() {
    return {
      _scxConfig: scxConfig,
      addButtonData: [
        {label: '导出统计Excel', type: 'doSomeThing', doSomeThing: this.showDownload},
      ],
      tableConfig: {
        modelName: 'ShouWenDengJi',//此处表示 页面 的国际化之类的
        editShow: 'wenjianbiaoti',
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
          prop: 'wenJianBianHao', isFilter: true,
          width: '150px',
          type: 'input-number',
          showFlag: ['update'],
          rules: {required: true, trigger: 'blur', isUnique: true}
        },
        {
          label: '来文期数',
          prop: 'laiWenQiShu', isFilter: true,
          width: '150px',
          type: 'input-number'
        },
        {
          prop: 'shouWenRiQi', isFilter: true,
          label: '收文日期',
          width: '150px',
          type: 'date-picker',
          filterWidth: '320px',
          defaultValue: this.getShouwenriqi(),
          rules: {required: true, trigger: 'blur',}
        },
        {
          prop: 'laiWenShiJian', isFilter: true,
          label: '来文时间',
          width: '150px',
          filterWidth: '320px',
          type: 'date-picker',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '来文单位',
          prop: 'laiWenDanWei', isFilter: true,
          width: '190px',
          type: 'selectByUrl',
          selectByUrl: 'api/LaiWenDanWei/list',
          selectByUrlLabel: 'name',
          selectByUrlValue: 'id',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '来文类型及途径',
          prop: 'laiWenLeiXing', isFilter: true,
          width: '120px',
          type: 'selectByUrl',
          selectByUrl: 'api/LaiWenLeiXing/list',
          filterLabelFormat: (o) => o.name + " : " + o.fenShu + "分",
          selectByUrlLabel: 'name',
          selectByUrlValue: 'id',
          rules: {required: true, trigger: 'blur',}
        },
        // {
        //   label: '获取途径',
        //   prop: 'huoQuTuJing', isFilter: true,
        //   type: 'selectByUrl',
        //   filterLabelFormat: (o) => o.name + " : " + o.fenShu + "分",
        //   selectByUrl: 'api/HuoQuTuJing/list',
        //   selectByUrlLabel: 'name',
        //   selectByUrlValue: 'id',
        //   width: '120px',
        //   rules: {required: true, trigger: 'blur',}
        // },
        {
          label: '获取途径(其他)分数',
          prop: 'huoQuTuJingQiTaFenShu',
          type: 'input-number',
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
          aaa: true,
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '以下为采用情况',
          type: 'html',
          aaa: true,
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
          type: 'input-number',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '加分项',
          prop: 'laiWenDanWei1', isFilter: true,
          width: '190px',
          type: 'checkbox',
          selectByUrl: 'api/JiaFenXiang/list',
          selectByUrlLabel: 'name',
          selectByUrlValue: 'id',
          rules: {required: true, trigger: 'blur',}
        },
        {
          label: '批示项',
          prop: 'pishi', isFilter: true,
          width: '190px',
          type: 'checkbox',
          selectByUrl: 'api/PiShiXiang/list',
          selectByUrlLabel: 'name',
          selectByUrlValue: 'id',
          rules: {required: true, trigger: 'blur',}
        },

        {
          label: '指令性专题',
          prop: 'zhilingxingzhuanti',
          type: 'input-number',
          width: '120px',
        },
        {
          label: '重要情报',
          prop: 'zhongyaoqingbao',
          type: 'input-number',
          defaultValue: 0,
          width: '120px',
        },
        {
          label: '案件线索',
          prop: 'anjianxiansuo',
          type: 'input-number',
          defaultValue: 0,
          width: '120px',
        },
        {
          label: '其他加分',
          prop: 'qitajiafen',
          type: 'input-number',
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
          type: 'input-number',
          defaultValue: 0,
          width: '120px',
        },
        {
          label: '其他减分',
          type: 'input-number',
          defaultValue: 0,
          prop: 'qitajianfen',
          width: '120px',
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
      ],
      downloadExcelDialogFormVisible: false,
      downloadExcelTime: '',
      aaaa: scxConfig.baseApiUrl,
    }
  },
  methods: {
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
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // 防止影响页面
      iframe.style.height = '0'; // 防止影响页面
      iframe.src = scxConfig.baseApiUrl + '/api/shouwendengji/downloadExcel?downloadExcelTime=' + this.downloadExcelTime;
      document.body.appendChild(iframe);
      this.downloadExcelDialogFormVisible = false
    },
    showDownload() {
      this.downloadExcelDialogFormVisible = true
    }
  }
}
</script>
<style>
#downloadDiv > a {
  margin: 5px;
  font-size: 18px;
}
</style>

