export default {
    icon:'date-range',
    type: 'date',
    label: '日期',
    col: 24,
    prop: 'datePicker',
    showFrom: ['name', 'col', 'key', 'disabled', 'placeholder', 'clearable',
        'prefixicon', 'datetype', 'startplaceholder', 'endplaceholder', 'rangeseparator'
    ],
    placeholder: '请输入日期',
    disabled: false,
    prefixIcon: 'el-icon-time',
    datetype: 'date',
    startplaceholder: '开始时间',
    endplaceholder: '结束时间',
    rangeseparator: '至',
    // 校验
    rules: [
        {required: false, message: '请输入' + name, trigger: 'change'},
    ]
}