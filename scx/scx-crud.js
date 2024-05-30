class CRUDListParam {

    /**
     *   @type {CRUDPagination}
     */
    pagination;

    /**
     * @type {CRUDOrderByBody[]}
     */
    orderByBodyList;

    /**
     * @type {CRUDWhereBody[]}
     */
    whereBodyList;

    /**
     * @type CRUDSelectFilterBody
     */
    selectFilterBody;

    /**
     * @type {Object}
     */
    extParams;

}

class CRUDPagination {
    currentPage;
    pageSize;
}

class CRUDOrderByBody {
    fieldName;
    sortType;
}

class CRUDWhereBody {
    fieldName;
    whereType;
    value1;
    value2;
}

class CRUDSelectFilterBody {

    filterMode;

    /**
     * @type {String[]}
     */
    fieldNames;
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

    constructor(req, baseCrudApi) {
        this.req = req;
        this.listApi = baseCrudApi + "/list";
        this.infoApi = baseCrudApi + "/";
        this.addApi = baseCrudApi;
        this.updateApi = baseCrudApi;
        this.deleteApi = baseCrudApi + "/";
        this.batchDeleteApi = baseCrudApi + "/batch-delete";
        this.checkUniqueApi = baseCrudApi + "/check-unique/";
    }

    /**
     * list
     * @param crudListParam {CRUDListParam}
     * @return {Promise<ListResult>}
     */
    list(crudListParam) {
        return new Promise((resolve, reject) => this.req.post(this.listApi, crudListParam).then(data => resolve(data)).catch(e => reject(e)));
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
     * @param id {Number}
     * @return {Promise<Object>}
     */
    delete(id) {
        return new Promise((resolve, reject) => this.req.delete(this.deleteApi + id).then(data => resolve(data)).catch(e => reject(e)));
    }

    /**
     * batchDelete
     * @param deleteIDs {Number[]}
     * @return {Promise<BatchDeleteResult>}
     */
    batchDelete(deleteIDs) {
        return new Promise((resolve, reject) => this.req.delete(this.batchDeleteApi, {deleteIDs}).then(data => resolve(data)).catch(e => reject(e)));
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

}

export {
    ScxCrud,
    CRUDListParam,
    CRUDPagination,
    CRUDOrderByBody,
    CRUDWhereBody,
    CRUDSelectFilterBody,
    CRUDUpdateParam,
    ListResult,
    BatchDeleteResult,
    CheckUniqueResult,
};
