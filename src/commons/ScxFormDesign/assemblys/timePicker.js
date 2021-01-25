export default {
    type: 'time',
    label: '任意时间',
    col: 24,
    prop: 'time',
    showFrom: ['name', 'col', 'key', 'disabled', 'placeholder', 'clearable',
        'prefixicon', 'isrange', 'startplaceholder', 'endplaceholder', 'rangeseparator'
    ],
    disabled: false,
    placeholder: '请输入' + name,
    clearable: false,
    prefixicon: 'el-icon-time',
    isrange: false,
    startplaceholder: '开始时间',
    endplaceholder: '结束时间',
    rangeseparator: '至',
    // 校验
    rules: [
        {required: false, message: '请输入' + name, trigger: 'change'},
    ]
}