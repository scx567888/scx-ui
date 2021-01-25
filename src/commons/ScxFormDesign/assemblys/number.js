export default {
    icon:'number',
    type: 'number',
    label: '计数器',
    col: 24,
    prop: 'number',
    showFrom: ['label', 'col', 'prop', 'min', 'max',
        'step', 'stepstrictly', 'precision', 'disabled', 'controlsposition', 'placeholder', 'rules'
    ],
    min: 0,
    max: 10000,
    step: 1,
    stepstrictly: false,
    precision: 1,
    disabled: false,
    controlsposition: 'right',
    placeholder: '请输入数字',
    // 校验
    rules: [
        {required: false, message: '请输入' + name, trigger: 'change'},
    ]
}