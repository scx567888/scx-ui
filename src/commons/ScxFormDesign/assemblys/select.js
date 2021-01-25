export default {
    icon: 'select',
    type: 'select',
    label: '下拉框',
    col: 24,
    prop: 'select',
    showFrom: ['label', 'col', 'prop', 'multiple', 'collapsetags', 'placeholder',
        'clearable', 'disabled', 'filterable', 'allowcreate', 'datatype', 'option', 'url', 'rules'
    ],
    multiple: false,
    collapsetags: false,
    disabled: false,
    filterable: false,
    allowcreate: false,
    placeholder: '请输入' + name,
    clearable: true,
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