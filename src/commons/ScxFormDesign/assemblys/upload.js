export default {
    type: 'upload',
    label: '上传组件',
    col: 24,
    prop: 'upload',
    showFrom: ['label', 'col', 'prop'],
    minlength: 0,
    maxlength: 100,
    showwordlimit: true,
    placeholder: '请输入' + name,
    clearable: true,
    showpassword: false,
    disabled: false,
    prefixicon: 'el-icon-edit',
    suffixicon: '',
    prepend: '',
    append: '',
    // 校验
    rules: [
        {required: false, message: '请输入' + name, trigger: 'change'},
    ],
}