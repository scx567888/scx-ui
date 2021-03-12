//初始化 右侧操作的按钮数据
import {ref} from "vue";

const editButtons = ref([//表格内列编辑按钮的数据
    {
        prop: 'edit',
        label: "table.edit",
        colorType: 'primary',
        callback: (row) => {
            handleUpdate(row, 'update', 'table')
        }
    }, {
        prop: 'delete',
        label: "table.delete",
        colorType: 'danger',
        callback: (row) => {
            handleDelete(row)
        }
    }]);
new function initEditButtons() {
    editButtons.value = editButtons.value.concat(props.scxEditButtons);
    const excludedEditButtonProps = [];
    !crudConfig.hasUpdateButton && excludedEditButtonProps.push('edit');
    !crudConfig.hasDeleteButton && excludedEditButtonProps.push('delete');
    editButtons.value = editButtons.value.filter(item => !excludedEditButtonProps.includes(item.prop))
}