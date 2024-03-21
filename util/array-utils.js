/**
 * 拷贝数组 (浅拷贝)
 * @param list
 * @returns {*[]}
 */
function copyArray(list) {
    return [...list];
}

/**
 * 根据 索引 从数组中移除 项
 * @param list
 * @param index
 */
function removeByIndex(list, index) {
    list.splice(index, 1);
}

/**
 * 内部用 所以不进行 index 是否越界的校验
 * @param list a
 * @param oldIndex a
 * @param newIndex a
 */
function moveItemByIndex(list, oldIndex, newIndex) {
    //经过计算 后有可能导致 索引没变化 这时就不需要在移动一次了
    if (oldIndex !== newIndex) {
        //保存临时数据
        const oldItem = list[oldIndex];
        //从原数组中移除数据
        list.splice(oldIndex, 1);
        //在指定位置插入新数据
        list.splice(newIndex, 0, oldItem);
    }
}

/**
 * 根据 索引 从数组中上移 项
 * @param list 列表
 * @param index 索引
 * @param loop 是否采用循环
 * @param step 步长
 */
function moveUpByIndex(list, index, loop = false, step = 1) {
    let minIndex = 0;
    let nextIndex = index - step;
    if (nextIndex < minIndex) {
        nextIndex = loop ? nextIndex % list.length + list.length : minIndex;
    }
    return moveItemByIndex(list, index, nextIndex);
}

/**
 * 根据 索引 从数组中下移 项
 * @param list 列表
 * @param index 索引
 * @param loop 是否采用循环
 * @param step 步长
 */
function moveDownByIndex(list, index, loop = false, step = 1) {
    let maxIndex = list.length - 1;
    let nextIndex = index + step;
    if (nextIndex > maxIndex) {
        nextIndex = loop ? nextIndex % list.length : maxIndex;
    }
    return moveItemByIndex(list, index, nextIndex);
}

/**
 * 根据 项 从数组中移除 项
 * @param list
 * @param item
 */
function removeByItem(list, item) {
    return removeByIndex(list, list.indexOf(item));
}

/**
 * 根据 项 从数组中上移 项
 * @param list 列表
 * @param item 项
 * @param loop 是否采用循环
 * @param step 步长
 */
function moveUpByItem(list, item, loop = false, step = 1) {
    return moveUpByIndex(list, list.indexOf(item), loop, step);
}

/**
 * 根据 项 从数组中下移 项
 * @param list 列表
 * @param item 项
 * @param loop 是否采用循环
 * @param step 步长
 */
function moveDownByItem(list, item, loop = false, step = 1) {
    return moveDownByIndex(list, list.indexOf(item), loop, step);
}

/**
 * 在指定位置插入数据
 * @param list 列表
 * @param index 插入索引
 * @param items 项
 */
function insertItem(list, index, ...items) {
    if (index < 0) {
        list.unshift(...items);
    } else if (index > list.length) {
        list.push(...items);
    } else {
        list.splice(index, 0, ...items);
    }
}

function arrayEquals(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

export {
    copyArray,
    removeByIndex,
    moveUpByIndex,
    moveDownByIndex,
    removeByItem,
    moveUpByItem,
    moveDownByItem,
    insertItem,
    arrayEquals,
};
