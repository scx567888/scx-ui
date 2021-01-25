export default {
    icon:'checkbox',
    type: 'checkbox',
    label: '多选',
    col: 24,
    prop: 'checkbox',
    showFrom: ['label', 'col', 'prop', 'disabled', 'checkboxType', 'datatype', 'option', 'url', 'min', 'max'],
    // button
    checkboxType: 'fang',
    disabled: false,
    min: 0,
    max: 2,
    // 数据类型 option 和 url
    datatype: 'option',
    // 请求接口
    url: '',
    // 下拉框的选项
    option: [
        {value: 'Beijing', label: '北京'},
        {value: 'Shanghai', label: '上海'},
        {value: 'Tianjin', label: '天津'},
        {value: 'ChongQing', label: '重庆'}],
    // 校验
    rules: [
        {required: false, message: '请输入' + name, trigger: 'change'},
    ],
}