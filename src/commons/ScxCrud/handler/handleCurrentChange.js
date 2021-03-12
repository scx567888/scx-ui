import {scrollTo} from "../../../../utils/scrollTo";

function handleCurrentChange(val) {
    crudContext.queryParam.page = val
    getList();
    scrollTo(0, 800, function () {
        //与上相同
    })
}