import {state} from '../../store'

export function checkPermission(value) {
    if (value && value instanceof Array && value.length > 0) {
        return state.user.perms.some(role => value.includes(role));
    }
    return false
}

export default {
    name: 'permission',
    //待处理
    mounted(el, {value}) {
        if (!checkPermission(value)) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    },
    updated(el, {value}) {
        if (!checkPermission(value)) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    }
}