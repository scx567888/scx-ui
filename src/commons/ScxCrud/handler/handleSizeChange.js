import {scrollTo} from "../../../../utils/scrollTo";

function handleSizeChange(val) {
    crudContext.queryParam.limit = val
    getList();
    scrollTo(0, 800, function () {
        //再回到顶部之后可以在此做操作
    })
}