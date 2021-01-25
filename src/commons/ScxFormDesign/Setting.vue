<template>
  <div class="form-setting scx-card">
    <div v-if="clickForm">
      <p>1.拖动或点击最左侧内容到中间 即可添加组件</p>
      <p>2.将组件拖动到左右两侧垃圾桶中即可删除</p>
      <p>3.将组件拖动到其他组件上即可交换位置</p>
      <p>4.点击中间区域上方按钮即可切换表单大小及布局</p>
      <p>5.点击预览即可预览表单 保存同理</p>
      <p>6.点击组件即可对组件进行设置</p>
    </div>
    <div v-if='canShow("prop")'>
      字段名称
      <el-input v-model="nowFormItem.prop"/>
    </div>
    <div v-if='canShow("label")'>
      中文名
      <el-input v-model="nowFormItem.label"/>
    </div>
    <div v-if='canShow("col")'>
      栅格格数
      <el-slider v-model="nowFormItem.col" :max="24" :min="1"/>
    </div>
    <div v-if='canShow("rows")'>
      默认行数
      <el-input-number v-model="nowFormItem.rows" :max="10" :min="1"/>
    </div>
    <div v-if='canShow("minlength")'>
      最小长度
      <el-input-number v-model="nowFormItem.minlength" :min="0"/>
    </div>
    <div v-if='canShow("maxlength")'>
      最大长度
      <el-input-number v-model="nowFormItem.maxlength" :min="0"/>
    </div>
    <div v-if='canShow("showwordlimit")'>
      字数统计
      <el-switch v-model="nowFormItem.showwordlimit" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("placeholder")'>
      占位内容
      <el-input v-model="nowFormItem.placeholder"/>
    </div>
    <div v-if='canShow("clearable")'>
      可否清空
      <el-switch v-model="nowFormItem.clearable" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("showpassword")'>
      密码框
      <el-switch v-model="nowFormItem.showpassword" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("disabled")'>
      是否禁用
      <el-switch v-model="nowFormItem.disabled" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("prefixicon")'>
      头部图标
      <el-input v-model="nowFormItem.prefixicon"/>
    </div>
    <div v-if='canShow("suffixicon")'>
      尾部图标
      <el-input v-model="nowFormItem.suffixicon"/>
    </div>
    <div v-if='canShow("prepend")'>
      前置内容
      <el-input v-model="nowFormItem.prepend"/>
    </div>
    <div v-if='canShow("append")'>
      后置内容
      <el-input v-model="nowFormItem.append"/>
    </div>
    <div v-if='canShow("min")'>
      最小值
      <el-input-number v-model="nowFormItem.min"/>
    </div>
    <div v-if='canShow("max")'>
      最大值
      <el-input-number v-model="nowFormItem.max"/>
    </div>
    <div v-if='canShow("step")'>
      步长
      <el-input-number v-model="nowFormItem.step" :precision="2"></el-input-number>
    </div>
    <div v-if='canShow("stepstrictly")'>
      只能是步长的倍数
      <el-switch v-model="nowFormItem.stepstrictly" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </div>
    <div v-if='canShow("precision")'>
      精确小数点后几位
      <el-input-number v-model="nowFormItem.precision" :max="5" :min="0" :step="1" stepstrictly/>
    </div>
    <div v-if='canShow("controlsposition")'>
      按钮位置
      <el-select v-model="nowFormItem.controlsposition">
        <el-option label="两边" value=""></el-option>
        <el-option label="右边" value="right"></el-option>
      </el-select>
    </div>
    <div v-if='canShow("multiple")'>
      可否多选
      <el-switch v-model="nowFormItem.multiple" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("filterable")'>
      可否搜索
      <el-switch v-model="nowFormItem.filterable" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("allowcreate")  && nowFormItem.filterable'>
      可否创建选项
      <el-switch v-model="nowFormItem.allowcreate" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("collapsetags")  && nowFormItem.multiple'>
      选择内容全部展示
      <el-switch v-model="nowFormItem.collapsetags" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("width")'>
      开关宽度
      <el-input-number v-model="nowFormItem.width" :max="100" :min="40" :step="1"/>
    </div>
    <div v-if='canShow("activetext")'>
      打开时的文字描述
      <el-input v-model="nowFormItem.activetext"/>
    </div>
    <div v-if='canShow("inactivetext")'>
      关闭时的文字描述
      <el-input v-model="nowFormItem.inactivetext"/>
    </div>
    <div v-if='canShow("activecolor")'>
      打开时背景色
      <el-color-picker v-model="nowFormItem.activecolor" show-alpha/>
    </div>
    <div v-if='canShow("inactivecolor")'>
      关闭时背景色
      <el-color-picker v-model="nowFormItem.inactivecolor" show-alpha/>
    </div>
    <div v-if='canShow("showstops")'>
      显示间断
      <el-switch v-model="nowFormItem.showstops" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("showinput")'>
      输入框
      <el-switch v-model="nowFormItem.showinput" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("range")'>
      范围选择
      <el-switch v-model="nowFormItem.range" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("pickeroptions")'>
      开始时间
      <el-time-picker
          v-model="nowFormItem.timeOption.start"
          format='HH:mm'
          placeholder="开始时间"
          value-format='HH:mm'/>
    </div>
    <div v-if='canShow("pickeroptions")'>
      结束时间
      <el-time-picker
          v-model="nowFormItem.timeOption.end"
          format='HH:mm'
          placeholder="结束时间"
          value-format='HH:mm'
      />
    </div>
    <div v-if='canShow("pickeroptions")'>
      步长
      <el-time-picker
          v-model="nowFormItem.timeOption.step"
          :picker-options="{selectableRange: '00:01:00 - 06:00:00'}"
          format='HH:mm'
          placeholder="步长"
          value-format='HH:mm'
      />
    </div>
    <div v-if='canShow("isrange")'>
      范围选择
      <el-switch v-model="nowFormItem.isrange" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <div v-if='canShow("startplaceholder") && nowFormItem.isrange'>
      开始位置占位符
      <el-input v-model="nowFormItem.startplaceholder"/>
    </div>
    <div v-if='canShow("endplaceholder")&& nowFormItem.isrange'>
      结束位置占位符
      <el-input v-model="nowFormItem.endplaceholder"/>
    </div>
    <div v-if='canShow("rangeseparator") && nowFormItem.isrange'>
      分隔符
      <el-input v-model="nowFormItem.rangeseparator"/>
    </div>
    <div v-if='canShow("text")'>
      文字
      <el-input v-model="nowFormItem.text"/>
    </div>
    <div v-if='canShow("contentposition") '>
      文字位置
      <el-radio-group v-model="nowFormItem.contentposition">
        <el-radio-button label="left">左</el-radio-button>
        <el-radio-button label="center">中</el-radio-button>
        <el-radio-button label="right">右</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if='canShow("fontsize") '>
      文字大小
      <el-input-number v-model="nowFormItem.fontsize" :max="100" :min="12" :step="1"/>
    </div>
    <div v-if='canShow("textcolor") '>
      文字颜色
      <el-color-picker v-model="nowFormItem.textcolor" show-alpha/>
    </div>
    <div v-if='canShow("startplaceholder") '>
      开始位置占位符
      <el-input v-model="nowFormItem.startplaceholder"/>
    </div>
    <div v-if='canShow("endplaceholder")  '>
      结束位置占位符
      <el-input v-model="nowFormItem.endplaceholder"/>
    </div>
    <div v-if='canShow("rangeseparator")  '>
      分隔符
      <el-input v-model="nowFormItem.rangeseparator"/>
    </div>
    <div v-if='canShow("radiotype")'>
      展示类型
      <el-select v-model="nowFormItem.radiotype" placeholder="请选择">
        <el-option label="圆圈" value="yuan"></el-option>
        <el-option label="按钮" value="button"></el-option>
      </el-select>
    </div>
    <div v-if='canShow("checkboxtype")'>
      展示类型
      <el-select v-model="nowFormItem.checkboxType" placeholder="请选择" style="width:100%">
        <el-option label="方块" value="fang"></el-option>
        <el-option label="按钮" value="button"></el-option>
      </el-select>
    </div>
    <div v-if='canShow("datatype") '>
      数据类型
      <el-select v-model="nowFormItem.datatype" placeholder="请选择">
        <el-option label="配置数据" value="option"></el-option>
        <el-option label="接口数据" value="url"></el-option>
      </el-select>
    </div>
    <div v-if='canShow("url") && nowFormItem.datatype === "url" '>
      接口地址
      <el-input v-model="nowFormItem.url"/>
    </div>
    <div v-if='canShow("rules")'>
      是否必填
      <el-switch v-model="nowFormItem.rules[0].required" active-color="#13ce66" inactive-color="#ff4949"/>
    </div>
    <el-table v-if='canShow("option")  && nowFormItem.datatype === "option" '
              :data="nowFormItem.option" border highlight-current-row size='mini'>
      <el-table-column label="显示值">
        <template v-slot="scope">
          <el-input
              v-model="scope.row.label"
              placeholder="请输入内容"
              size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="传递值">
        <template v-slot="scope">
          <el-input
              v-model="scope.row.value"
              placeholder="请输入内容"
              size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
              size="mini"
              type="danger"
              @click="deleteOption(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button v-if='canShow("option")  && nowFormItem.datatype === "option" ' size='mini'
               style="margin-top:10px"
               @click="addOption">增加选项
    </el-button>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "scx-form-design-setting",
  props: {
    modelValue: Boolean,
  },
  setup(props, context) {
    const nowFormItem = computed({
      get: () => props.modelValue,
      set: (value) => context.emit('update:modelValue', value)
    })

    const canShow = (val) => nowFormItem.showFrom ? nowFormItem.showFrom.includes(val) : false;

    // 删除选项
    function deleteOption(index) {
      nowFormItem.option.splice(index, 1)
    }

    function addOption() {
      nowFormItem.option.push({label: '新的选择', value: 'newValue'})
    }

    return {canShow, nowFormItem, deleteOption, addOption}
  }
}
</script>

<style scoped>

</style>