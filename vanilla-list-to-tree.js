/**
 * 将含有 id parentID 的 list 列表转换为树形结构
 * 这里将 parentID 为 null 或 undefined 的设置为 第一层
 * list 格式要求 [{parentID:null, id:10}, {parentID:10, id:100}]
 */
function listToTree(source, rawOptions = {}) {
    const {
        idFieldName = "id", // id FieId 的名称 默认为 'id'
        parentIDFieldName = "parentID", // parentID FieId 的名称 默认为 'parentID'
        childrenFieldName = "children", // children FieId 的名称 默认为 'children'
        ignoreOrphans = false // 是否忽略孤儿节点
    } = rawOptions;
    //只处理数组结构
    if (!source || !Array.isArray(source)) {
        console.warn("listToTree : 数据为空或数据格式有误 (正确情况应为 Array) !!!")
        return [];
    }
    let cloneData = JSON.parse(JSON.stringify(source));  // 对源数据深度克隆
    const idMap = new Map();
    const parentIDMap = new Map();
    for (let t of cloneData) {
        idMap.set(t[idFieldName], t);
        const v = parentIDMap.get(t[parentIDFieldName]);
        if (v) {
            v.push(t);
        } else {
            parentIDMap.set(t[parentIDFieldName], [t])
        }
    }
    // 循环所有项，并添加 children 属性
    return cloneData.filter(my => {
        const myID = my[idFieldName]; //我自己的 id
        const parentID = my[parentIDFieldName]; //我父亲的 id
        //判断是否为孤儿 , 如果查询不到他的父级节点 那么他就是孤儿
        let isOrphan = !ignoreOrphans && (parentID == null || idMap.get(parentID) == null);
        if (myID) {
            // 返回每一项的子级数组
            const myChildren = parentIDMap.get(myID);
            if (myChildren && myChildren.length > 0) {
                my[childrenFieldName] = myChildren;
            }
        }
        //需要返回的节点 1, 是根节点 2, 是孤儿节点
        return parentID === null || parentID === undefined || isOrphan;
    });

}

export {listToTree}