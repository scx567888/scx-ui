export default {
    icon:'slider',
    type: 'slider',
    label: '滑块',
    col: 24,
    prop: 'slider',
    showFrom: ['name', 'col', 'key', 'min', 'max', 'disabled', 'step', 'showstops', 'showinput', 'range',],
    min: 0,
    max: 100,
    disabled: false,
    step: 1,
    showstops: false,
    showinput: false,
    // 多选
    range: false,
    // 校验
    rules: [{required: false, message: '请输入' + name, trigger: 'change'},]
}