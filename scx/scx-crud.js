import {QUERY_SERIALIZER} from "./scx-data/query/serializer/QuerySerializer.js";
import {FIELD_FILTER_SERIALIZER} from "./scx-data/field_filter/serializer/FieldFilterSerializer.js";


class CRUDListParam {

    /**
     * @type {Query}
     */
    query;

    fieldFilter;

    extParams;

}

class CRUDUpdateParam {

    /**
     * @type {Object}
     */
    updateModel;

    /**
     * @type {String[]}
     */
    needUpdateFieldNames;

}

class ListResult {

    /**
     * @type {Object[]}
     */
    items;

    /**
     * @type {Number}
     */
    total;

}

class BatchDeleteResult {

    /**
     * @type {Number}
     */
    deletedCount;

}

class CheckUniqueResult {

    /**
     * @type {Boolean}
     */
    isUnique;
}

class ScxCrud {

    /**
     * @type {ScxReq}
     */
    req;

    listApi;
    infoApi;
    addApi;
    updateApi;
    deleteApi;
    batchDeleteApi;
    checkUniqueApi;
    countApi;

    constructor(req, baseCrudApi) {
        this.req = req;
        this.listApi = baseCrudApi + "/list";
        this.infoApi = baseCrudApi + "/";
        this.addApi = baseCrudApi;
        this.updateApi = baseCrudApi;
        this.deleteApi = baseCrudApi + "/";
        this.batchDeleteApi = baseCrudApi + "/batch-delete";
        this.checkUniqueApi = baseCrudApi + "/check-unique/";
        this.countApi = baseCrudApi + "/count";
    }

    /**
     * list
     * @param crudListParam {CRUDListParam}
     * @return {Promise<ListResult>}
     */
    list(crudListParam) {
        return new Promise((resolve, reject) => this.req.post(this.listApi, serializeCRUDListParam(crudListParam)).then(data => resolve(data)).catch(e => reject(e)));
    };

    /**
     * info
     * @param id {Number}
     * @return {Promise<Object>}
     */
    info(id) {
        return new Promise((resolve, reject) => this.req.get(this.infoApi + id, null).then(data => resolve(data)).catch(e => reject(e)));
    }

    /**
     * add
     * @param saveModel {Object}
     * @return {Promise<Object>}
     */
    add(saveModel) {
        return new Promise((resolve, reject) => this.req.post(this.addApi, saveModel).then(data => resolve(data)).catch(e => reject(e)));
    }

    /**
     * update
     * @param crudUpdateParam {CRUDUpdateParam}
     * @return {Promise<Object>}
     */
    update(crudUpdateParam) {
        return new Promise((resolve, reject) => this.req.put(this.updateApi, crudUpdateParam).then(data => resolve(data)).catch(e => reject(e)));
    }

    /**
     * delete
     * @param crudListParam {CRUDListParam}
     * @return {Promise<Number>}
     */
    delete(crudListParam) {
        return new Promise((resolve, reject) => this.req.delete(this.deleteApi, serializeCRUDListParam(crudListParam)).then(data => resolve(data)).catch(e => reject(e)));
    }

    /**
     * checkUnique
     * @param fieldName {String}
     * @param value {Object}
     * @param id {Number}
     * @return {Promise<CheckUniqueResult>}
     */
    checkUnique(fieldName, value, id = null) {
        const v = {value, id};
        return new Promise((resolve, reject) => this.req.post(this.checkUniqueApi + fieldName, v).then(data => resolve(data)).catch(e => reject(e)));
    }

    /**
     * count
     * @param crudListParam {CRUDListParam}
     * @return {Promise<Number>}
     */
    count(crudListParam) {
        return new Promise((resolve, reject) => this.req.post(this.countApi, serializeCRUDListParam(crudListParam)).then(data => resolve(data)).catch(e => reject(e)));
    };

}

function serializeCRUDListParam(crudListParam) {
    const o = {};
    if (crudListParam.query) {
        o.query = QUERY_SERIALIZER.serializeQuery(crudListParam.query);
    }
    if (crudListParam.fieldFilter) {
        o.fieldFilter = FIELD_FILTER_SERIALIZER.serializeFieldFilter(crudListParam.fieldFilter);
    }
    o.extParams = crudListParam.extParams;
    return o;
}

export {
    ScxCrud,
    CRUDListParam,
    CRUDUpdateParam,
    ListResult,
    BatchDeleteResult,
    CheckUniqueResult,
    serializeCRUDListParam,
};
