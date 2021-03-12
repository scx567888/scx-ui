function groupItemDelete(col, index) {
    crudContext.temp[col.prop].splice(index, 1);
}