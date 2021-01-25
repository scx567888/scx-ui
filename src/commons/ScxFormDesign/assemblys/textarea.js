export default {
    icon:'textarea',
    type: 'textarea',
    label: '文本域',
    col: 24,
    prop: 'textarea',
    showFrom: ['name', 'col', 'key', 'rows', 'minlength', 'maxlength', 'showwordlimit', 'placeholder',
        'clearable', 'disabled',
    ],
    rows: 1,
    minlength: 0,
    maxlength: 100,
    showwordlimit: true,
    placeholder: '请输入' + name,
    clearable: true,
    disabled: false,
    // 校验
    rules: [
        {required: false, message: '请输入' + name, trigger: 'change'},
    ]
}