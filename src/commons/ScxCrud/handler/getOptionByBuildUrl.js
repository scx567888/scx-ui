//根据url 获取下拉选数据 没有分页限制
import request from "../../../../utils/request";

function getOptionByBuildUrl(selectUrl) {
    //此处设置 limit 为 -1 即可去除分页限制 (后台做的判断)
    return request.post(selectUrl, {limit: -1, orderBy: "id", page: 1, sort: "desc"})
}