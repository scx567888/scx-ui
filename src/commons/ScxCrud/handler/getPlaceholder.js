export function getPlaceholder(crudContext, col) {
    return col.placeholder || (crudContext.pageFlag === 'create' ? col.createPlaceholder : col.editPlaceholder);
}
