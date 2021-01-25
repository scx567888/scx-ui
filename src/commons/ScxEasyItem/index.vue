<template>
  <!-- 建议的组件封装 按照使用频率排序 -->
  <!-- 普通 input -->
  <el-input v-if="easyItemConfig.type==='input'" v-model="eModel"
            :autosize="{ minRows: easyItemConfig.minRows, maxRows:easyItemConfig.maxRows}"
            :disabled="eDisabled"
            :maxlength="easyItemConfig.maxlength"
            :minlength="easyItemConfig.minlength"
            :placeholder="ePlaceholder" :prefix-icon='easyItemConfig.prefixIcon'
            :show-password="easyItemConfig.showPassword" :show-word-limit="easyItemConfig.showWordLimit"
            :style="eStyle" :suffix-icon='easyItemConfig.suffixIcon'
            :type="easyItemConfig.textareaType" clearable>
    <template v-if='easyItemConfig.prepend' v-slot:prepend>
      {{ easyItemConfig.prepend }}
    </template>
    <template v-if='easyItemConfig.append' v-slot:append>
      {{ easyItemConfig.append }}
    </template>
  </el-input>

  <!-- 下拉选 -->
  <el-select v-else-if="easyItemConfig.type==='select'" v-model="eModel" :allow-create='easyItemConfig.allowCreate'
             :disabled="eDisabled"
             :filterable='easyItemConfig.filterable' :multiple='easyItemConfig.multiple' :placeholder="ePlaceholder"
             :style="eStyle" clearable
             filterable>
    <el-option v-for="(option,index) in optionArray" :key="'select_'+index"
               :label="getSelectOptionLabel(option)" :value="getSelectOptionValue(option)"/>
  </el-select>

  <!-- 数字选择器 -->
  <el-input-number v-else-if="easyItemConfig.type==='number'" v-model="eModel"
                   :controls="easyItemConfig.controls"
                   :controls-position='easyItemConfig.controlsPosition' :disabled="eDisabled"
                   :max="easyItemConfig.maxNumber"
                   :min="easyItemConfig.minNumber"
                   :placeholder="ePlaceholder"
                   :precision='easyItemConfig.precision'
                   :step="easyItemConfig.step" :step-strictly='easyItemConfig.stepstrictly'
                   :style="eStyle" clearable/>

  <el-date-picker v-else-if="easyItemConfig.type==='date'" v-model="eModel"
                  :disabled="eDisabled"
                  :end-placeholder="easyItemConfig.placeholder||easyItemConfig.label+'结束日期'"
                  :placeholder="ePlaceholder"
                  :range-separator="easyItemConfig.type==='date'?'至':'-'"
                  :start-placeholder="easyItemConfig.placeholder||easyItemConfig.label+'开始日期'"
                  :style="eStyle"
                  :type="easyItemConfig.datePickerType"
                  clearable
                  value-format="yyyy-MM-dd"/>

  <el-date-picker v-else-if="easyItemConfig.type==='datetime'" v-model="eModel"
                  :disabled="eDisabled"
                  :end-placeholder="easyItemConfig.placeholder||easyItemConfig.label+'结束日期'"
                  :placeholder="ePlaceholder"
                  :range-separator="easyItemConfig.type==='date'?'至':'-'"
                  :start-placeholder="easyItemConfig.placeholder||easyItemConfig.label+'开始日期'"
                  :style="eStyle"
                  :type="easyItemConfig.datePickerType"
                  clearable
                  value-format="yyyy-MM-dd HH:mm:ss"/>

  <el-time-picker v-else-if="easyItemConfig.type==='time'" v-model="eModel"
                  :disabled="eDisabled"
                  :end-placeholder='easyItemConfig.endPlaceholder'
                  :is-range='easyItemConfig.isRange'
                  :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                  :placeholder="ePlaceholder"
                  :prefix-icon='easyItemConfig.prefixIcon'
                  :range-separator='easyItemConfig.rangeSeparator'
                  :start-placeholder='easyItemConfig.startPlaceholder' :style="eStyle"
                  clearable value-format="HH:mm:ss"/>

  <el-time-select v-else-if="easyItemConfig.type==='timeSelect'" v-model="eModel"
                  :disabled="eDisabled"
                  :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
                  :placeholder="ePlaceholder"
                  :style="eStyle"
                  placeholder="选择时间"/>

  <el-cascader v-else-if="easyItemConfig.type==='cascade'" v-model="eModel" :disabled="eDisabled"
               :options="easyItemConfig.options"
               :placeholder="ePlaceholder"
               :style="eStyle"
               filterable/>

  <!--省市县级联选择器  因为此功能比较特殊 所以作为一个单独的组件-->
  <el-cascader v-else-if="easyItemConfig.type==='region'" v-model="eModel" :disabled="eDisabled"
               :options="getRegionData()"
               :placeholder="ePlaceholder" :style="eStyle" filterable/>

  <!-- 滑块   -->
  <el-slider v-else-if='easyItemConfig.type==="slider"' v-model="eModel"
             :disabled="eDisabled"
             :max='easyItemConfig.max'
             :min='easyItemConfig.min'
             :placeholder="ePlaceholder"
             :range='easyItemConfig.range'
             :show-input='easyItemConfig.showInput'
             :show-stops='easyItemConfig.showStops'
             :step='easyItemConfig.step'
             :style="eStyle"/>


  <el-autocomplete v-else-if="easyItemConfig.type==='autoComplete'" v-model="eModel"
                   :disabled="eDisabled"
                   :fetch-suggestions="((queryString,cb)=>{autoCompleteQuery(queryString,cb)})"
                   :placeholder="ePlaceholder"
                   :style="eStyle" clearable/>


  <el-checkbox-group v-else-if="easyItemConfig.type==='checkbox'" v-model="eModel" :border='easyItemConfig.border'
                     :disabled="eDisabled"
                     :max='easyItemConfig.max'
                     :min='easyItemConfig.min'
                     :placeholder="ePlaceholder" :style="eStyle">
    <div v-if='!easyItemConfig.checkboxType||easyItemConfig.checkboxType=== "fang"'>
      <el-checkbox v-for="(option,index) in optionArray" :key="'checkbox'+index"
                   :label="getSelectOptionValue(option)">
        {{ getSelectOptionLabel(option) }}
      </el-checkbox>
    </div>
    <div v-if='easyItemConfig.checkboxType=== "button"'>
      <el-checkbox-button v-for="(option,index) in optionArray" :key="'checkbox'+index"
                          :label="getSelectOptionValue(option)">
        {{ getSelectOptionLabel(option) }}
      </el-checkbox-button>
    </div>
  </el-checkbox-group>

  <el-radio-group v-else-if='easyItemConfig.type==="radio"' v-model="eModel" :disabled="eDisabled" :style="eStyle">
    <div v-if='easyItemConfig.radioType==="round"'>
      <el-radio v-for='(item2,index2) in optionArray' :key="index2" :label="item2.value">{{ item2.label }}</el-radio>
    </div>
    <div v-if='easyItemConfig.radioType==="button"'>
      <el-radio-button v-for='(item2,index2) in optionArray' :key="index2" :label="item2.value">{{ item2.label }}
      </el-radio-button>
    </div>
  </el-radio-group>

  <el-rate v-else-if='easyItemConfig.type==="rate"' v-model="eModel" :disabled="eDisabled" :style="eStyle"/>

  <!-- switch 组件 -->
  <el-switch v-else-if="easyItemConfig.type==='switch'" v-model="eModel" :disabled="eDisabled" :style="eStyle"/>

  <scx-tree-select v-else-if="easyItemConfig.type==='treeSelect'" v-model="eModel" :build-url="easyItemConfig.buildUrl"
                   :default-expanded-keys="easyItemConfig.defaultExpandedKeys"
                   :disabled="eDisabled"
                   :label-prop="easyItemConfig.labelProp"
                   :placeholder="ePlaceholder"
                   :single-choice="easyItemConfig.singleChoice"
                   :style="eStyle"
                   :value-prop="easyItemConfig.valueProp"/>

  <!-- 富文本编辑器 -->
  <scx-tinymce v-else-if="easyItemConfig.type==='tinymce'" v-model="eModel" :disabled="eDisabled"
               :placeholder="ePlaceholder"
               :style="eStyle"/>

  <!-- 代码编辑器组件 -->
  <scx-code-mirror v-else-if="easyItemConfig.type==='codemirror'" v-model="eModel" :disabled="eDisabled"
                   :placeholder="ePlaceholder"
                   :style="eStyle"/>

  <!-- 文件上传组件 -->
  <scx-upload v-else-if="easyItemConfig.type==='upload'" v-model="eModel" :disabled="eDisabled"
              :placeholder="ePlaceholder"
              :style="eStyle"/>



  <!-- 自定义渲染的 html -->
  <div v-else-if="easyItemConfig.type==='html'" :style="eStyle" v-html='easyItemConfig.html'></div>

</template>

<script>
import {getRegionData} from "../../utils/constant/region/index";
import {computed, inject, reactive, ref} from "vue";

export default {
  name: "scx-easy-item",
  props: {
    // 表单内的组件对象
    scxEasyItemConfig: {
      type: Object,
      default: () => {
      }
    },
    modelValue: {},
    placeholder: {},
    style: {},
    disabled: {},
    isFilter: {type: Boolean, default: false},
  },
  emits: ['update:modelValue', 'change', 'clear', 'keyupEnter', 'style', 'placeholder'],
  setup(props, context) {

    const typeList = ['input', 'radio', 'checkbox', 'number', 'select', 'cascade', 'switch', 'slider', 'time',
      'timeSelect', 'date', 'dateTime', 'upload', 'rate', 'color', 'autoComplete', 'treeSelect', 'tinymce',
      'codemirror', 'html', 'textarea', 'link'
    ];

    const crudContext = inject('crudContext');
    const optionArray = ref([]);
    optionArray.value = crudContext ? computed(() => crudContext.optionArray[easyItemConfig.prop]) : props.option;

    const eModel = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        context.emit('update:modelValue', value)
      }
    });
    const ePlaceholder = computed(() => props.placeholder);
    const eStyle = computed(() => props.style);
    const eDisabled = computed(() => props.disabled);

    const easyItemConfig = reactive({
      type: '',
      //取值范围和 type 相同
      filterType: 'input',
      controlsPosition: false,
      allowCreate: false,
      filterable: true,
      minRows: 2,
      maxRows: 10,
      maxlength: 20,
      prefixIcon: null,
      suffixIcon: null,
      showPassword: false,
      showWordLimit: false,
      textareaType: '',
      maxNumber: 9999999,
      minNumber: 0,
      labelProp: 'label',
      valueProp: 'value',
      filterLabelFormat: null,
      html: false,
      radioType: 'round',
      precision: false,
      datePickerType: 'data',
      multiple: false
    });

    new function initEasyItemConfig() {
      Object.assign(easyItemConfig, props.scxEasyItemConfig);
      if (easyItemConfig.type === '') {
        easyItemConfig.type = 'input'
        console.warn('ScxEasyItem : 未找到 type 已使用默认值 input');
      } else if (!typeList.includes(easyItemConfig.type)) {
        easyItemConfig.type = 'input'
        console.warn('ScxEasyItem : type 取值 ' + easyItemConfig.type + ' 不正确 已采用默认值 input');
      } else if (easyItemConfig.type === 'link') {
        easyItemConfig.type = 'input'
      } else if (easyItemConfig.type === 'textarea') {
        easyItemConfig.type = 'textarea'
        easyItemConfig.maxlength = 200
        easyItemConfig.showWordLimit = true
      } else if (easyItemConfig.type === 'password') {
        easyItemConfig.type = 'input'
        easyItemConfig.showPassword = true
      } else if (easyItemConfig.type === 'switch') {
        //此处把所有的 类型转换为 filter 的类型
        if (props.isFilter) {
          easyItemConfig.type = 'select'
          optionArray.value = [{label: "是", value: true}, {label: "否", value: false}]
        }
      }
    }

    //下拉选等的数据
    function getSelectOptionLabel(option) {
      if (easyItemConfig.filterLabelFormat) {
        return easyItemConfig.filterLabelFormat(option);
      } else {
        return option[easyItemConfig.labelProp];
      }
    }

    function getSelectOptionValue(option) {
      return option[easyItemConfig.valueProp] + '';
    }

    function autoCompleteQuery(queryString, cb) {
      let restaurants = optionArray;
      let results;
      if (queryString) {
        let tempArray = [];
        for (let key in restaurants) {
          if (!restaurants.hasOwnProperty(key)) continue;
          if (restaurants[key].value.search(queryString) !== -1) {
            tempArray.push(restaurants[key])
          }
        }
        results = tempArray
      } else {
        results = restaurants
      }
      // 调用 callback 返回建议列表的数据
      cb(results);
    }

    return {
      easyItemConfig,
      getSelectOptionLabel,
      getSelectOptionValue,
      autoCompleteQuery,
      getRegionData,
      optionArray,
      eModel,
      ePlaceholder,
      eStyle,
      eDisabled
    }
  }
}
</script>
