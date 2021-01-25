import {state} from "../store";

//todo tagview 需要重构
function delAllVisitedViews() {
    return new Promise(resolve => {
        state.tagsView.visitedViews = state.tagsView.visitedViews.filter(tag => tag.meta.affix)
        resolve([...state.tagsView.visitedViews])
    })
}

function delAllCachedViews() {
    return new Promise(resolve => {
        state.tagsView.cachedViews = []
        resolve([...state.tagsView.cachedViews])
    })
}


function delAllViews(view) {
    return new Promise(resolve => {
        delAllVisitedViews(view)
        delAllCachedViews(view)
        resolve({
            visitedViews: [...state.tagsView.visitedViews],
            cachedViews: [...state.tagsView.cachedViews]
        })
    })
}

export {
    delAllCachedViews, delAllViews, delAllVisitedViews
}