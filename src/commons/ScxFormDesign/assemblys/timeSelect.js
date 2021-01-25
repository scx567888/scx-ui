export default {
    type: 'time',
    label: '固定时间',
    col: 24,
    prop: 'time',
    showFrom: ['label', 'col', 'prop', 'disabled', 'placeholder', 'pickeroptions', 'clearable',
        'prefixicon'
    ],
    disabled: false,
    placeholder: '请输入时间',
    clearable: false,
    prefixicon: 'el-icon-time',
    timeOption: {
        start: '09:00',
        end: '18:00',
        step: '00:15'
    },
    // 校验
    rules: [
        {required: false, message: '请输入' + name, trigger: 'change'},
    ]
}