export default {
    icon:'switch',
    type: 'switch',
    label: '开关',
    col: 24,
    prop: 'switch',
    showFrom: ['name', 'col', 'key', 'disabled', 'activetext', 'inactivetext',
        'activecolor', 'inactivecolor'
    ],
    disabled: false,
    activetext: '开',
    inactivetext: '关',
    activecolor: '#409EFF',
    inactivecolor: '#C0CCDA',
    // 校验
    rules: [
        {required: false, message: '请输入' + name, trigger: 'change'},
    ]
}