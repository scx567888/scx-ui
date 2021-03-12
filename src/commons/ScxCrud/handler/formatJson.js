import {filterRegion, filterSelect, filterSwitch} from "../../../ScxTable/filterUtils";

function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => {
        const value = v[j.prop];
        if (j.excelFormat) {
            return j.excelFormat(v)
        } else if (j.type === 'switch') {
            return filterSwitch(value)
        } else if (j.type === 'region') {
            return filterRegion(value)
        } else if (j.type === 'select') {
            return filterSelect(j, value, crudContext.optionArray[j.prop])
        } else {
            return value
        }
    }))
}