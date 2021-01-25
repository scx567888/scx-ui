<template>
  <div style="margin: 10px">
    <h3 style="margin-left: 10px">4.0 (最新版本) 元数据情况</h3>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>数据结构</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="show(1)">引用情况</el-button>
        </div>
        <div id="my-charts1" style="width: 100%;height:300px;"></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>数据定义</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="show(2)">引用情况</el-button>
        </div>
        <scx-table :body="[{id:1,a:'',b:''}]"
                   :config="{operationWidth:'120px',maxHeight:300}"
                   :head="[{prop:'a',label:'引用名称'},{prop:'b',label:'引用情况',tableLabelFormat: hhhhh}]"
                   :loading="false">
          <template slot="operation">
            <el-button size="mini" type="success">详情</el-button>
          </template>
        </scx-table>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>数据空间</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="show(3)">引用情况</el-button>
        </div>
        <div id="my-charts" style="width: 100%;height:300px;"></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>数据字典</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="show(4)">引用情况</el-button>
        </div>
        <s-table :data-list="[{id:1,a:'',b:''}]"
                 :head-data="[{prop:'a',label:'引用名称'},{prop:'b',label:'引用情况',tableLabelFormat: hhhhh}]"
                 :loading="false"
                 :row-key="(a)=>a.id"
                 :s-table-config="{operationWidth:'120px',maxHeight:300}">
          <template slot="operation">
            <el-button size="mini" type="success">详情</el-button>
          </template>
        </s-table>
      </el-card>
    </div>

    <el-dialog :title="dialogData.title" :visible.sync="visible" width="60%">
      <s-table :data-list="dialogData.dataList"
               :head-data="[{prop:'a',label:'引用名称'},{prop:'b',label:'引用情况',tableLabelFormat: hhhhh}]"
               :loading="false"
               :row-key="(a)=>a.id"
               :s-table-config="{operationWidth:'120px',maxHeight:300}">
        <template slot="operation">
          <el-button size="mini" type="success">详情</el-button>
        </template>
      </s-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取 消</el-button>
    <el-button type="primary" @click="visible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script type="text/jsx">

export default {
  name: 'banbengenzongInfo',
  data() {
    return {
      visible: false,
      dialogData: {},
      option: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  }, methods: {
    show(type) {
      if (type === 1) {
        this.dialogData = {
          title: '数据结构引用情况',
          dataList: [{id: 1, a: 't_teacher', b: 'Y'}, {id: 2, a: 't_student', b: 'Y'}, {id: 3, a: 't_demo', b: '-'},
            {id: 4, a: 't_test', b: 'Y'},
            {id: 5, a: 't_user', b: 'N'}, {id: 6, a: 't_room', b: 'Y'}]
        }
      } else if (type === 2) {
        this.dialogData = {
          title: '数据定义引用情况',
          dataList: [{id: 1, a: 't_teacher', b: 'Y'}, {id: 2, a: 't_student', b: 'Y'}, {id: 3, a: 't_demo', b: 'Y'},
            {id: 4, a: 't_test', b: 'Y'},
            {id: 5, a: 't_user', b: 'N'}, {id: 6, a: 't_room', b: 'Y'}]
        }
      } else if (type === 3) {
        this.dialogData = {
          title: '数据空间引用情况',
          dataList: [{id: 1, a: 't_teacher', b: 'Y'}, {id: 2, a: 't_student', b: 'Y'}, {id: 3, a: 't_demo', b: 'N'},
            {id: 4, a: 't_test', b: 'Y'},
            {id: 5, a: 't_user', b: 'N'}, {id: 6, a: 't_room', b: '-'}]
        }
      } else if (type === 4) {
        this.dialogData = {
          title: '数据字典引用情况',
          dataList: [{id: 1, a: 't_teacher', b: 'Y'}, {id: 2, a: 't_student', b: 'Y'}, {id: 3, a: 't_demo', b: 'Y'},
            {id: 4, a: 't_test', b: 'Y'},
            {id: 5, a: 't_user', b: 'Y'}, {id: 6, a: 't_room', b: 'Y'}]
        }
      }
      this.visible = true
    },
    hhhhh(o) {
      // if (o.b === 'Y') {
      //   return <span style="color:rgb(59 183 63)">Y</span>
      // } else if (o.b === 'N') {
      //   return <span style="color:rgb(220 58 26)">N</span>
      // } else if (o.b === '-') {
      //   return <span style="color:#000000">-</span>
      // }
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("my-charts"));
    let myChart1 = echarts.init(document.getElementById("my-charts1"));
    myChart1.setOption({
      title: {
        text: 'Node Align Left'
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      animation: false,
      series: [
        {
          type: 'sankey',
          focusNodeAdjacency: 'allEdges',
          nodeAlign: 'right',
          lineStyle: {
            color: 'source',
            curveness: 0.5
          }
        }
      ]
    });

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption({
      tooltip: {
        formatter: function (info) {
          var value = info.value;
          var treePathInfo = info.treePathInfo;
          var treePath = [];

          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }

          return [
            '<div class="tooltip-title"></div>',
            'Disk Usage:  KB',
          ].join('');
        }
      },

      series: [
        {
          name: 'Disk Usage',
          type: 'treemap',
          visibleMin: 300,
          label: {
            show: true,
            formatter: '{b}'
          },
          itemStyle: {
            borderColor: '#fff'
          },
          levels: [
            {
              itemStyle: {
                borderWidth: 0,
                gapWidth: 5
              }
            },
            {
              itemStyle: {
                gapWidth: 1
              }
            },
            {
              colorSaturation: [0.35, 0.5],
              itemStyle: {
                gapWidth: 1,
                borderColorSaturation: 0.6
              }
            }
          ],
          data: require('./disk.tree.json')
        }
      ]
    });
  }
}
</script>
<style scoped>
.box-card {
  margin-bottom: 5px;
}
</style>
