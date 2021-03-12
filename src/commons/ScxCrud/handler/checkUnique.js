import request from "../../../../utils/request";

export function checkUnique(rule, value, callback, name) {
    if (value === '' || value === undefined) {
        callback(new Error(name + "不能为空"))
    } else {
        let p = {};
        p[rule.field] = value;
        if (crudContext.pageFlag !== 'create') {
            p['id'] = crudContext.temp.id;
        }
        request.post(crudConfig.checkUniqueApi, p).then(res => {
            if (res.isUnique) {
                callback()
            } else {
                callback(new Error(name + '已被占用'))
            }
        });
    }
}