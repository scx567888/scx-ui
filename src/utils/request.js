import {isExternal} from './index';
import scxConfig from '../../scx.config';
import {t} from "../i18n";
import {getToken, removeToken, removeUserState} from "./permUtil";
import {ElMessage, ElMessageBox} from "element-plus";

const baseApi = scxConfig.baseApi.endsWith("/") ? scxConfig.baseApi : scxConfig.baseApi + "/";

function baseMethod(url, data, method) {
    const requestUrl = isExternal(url) ? url : baseApi + (url.startsWith("/") ? url.slice(1) : url);
    const init = {
        method: method,
        headers: {
            'S-Token': getToken(),
        },
        credentials: 'include',
    };
    if (data != null) {
        if (Object.prototype.toString.call(data) === '[object FormData]') {
            init.body = data
        } else {
            init.headers["Content-type"] = 'application/json'
            init.body = JSON.stringify(data)
        }
    }
    return new Promise((resolve, reject) => {
        fetch(requestUrl, init)
            .then(res => res.json())
            .then(data => {
                // 如果不是 20 返回错误值
                if (data.code !== 20) {
                    // 58: 无效 Token ;
                    if (data.code === 58) {
                        ElMessageBox.confirm(t('error.youHaveBeenLoggedOut'), t('error.youHaveBeenLoggedOutTitle'), {
                            confirmButtonText: t('error.reLogin'),
                            cancelButtonText: t('table.cancelNoSpace'),
                            type: 'warning'
                        }).then(() => {
                            removeToken();
                            removeUserState();
                            location.reload();
                        })
                    } else if (data.code === 51) {
                        ElMessage.warning(t('error.noPermission') || '您没有权限进行该操作 !!!');
                    } else if (data.code === 50) {
                        ElMessage.error(t('error.Request failed with status code 500') || '服务器端发生错误 !!!');
                    } else if (data.message === 'tooManyErrors') {
                        ElMessage.error(t('error.' + data.message) + ' , 请 ' + data.remainingTime + ' 秒后重试 !!!');
                    } else {
                        ElMessage.error(t('error.' + data.message) || '未知错误 !!!');
                    }
                    return reject(new Error(data.message || 'Error'))
                } else {
                    resolve(data)
                }
            })
            .catch(error => {
                    ElMessage.error(t('error.' + error.message));
                    reject(error)
                }
            )
    })
}

class request {
    get = (url) => baseMethod(url, null, "GET");
    post = (url, data) => baseMethod(url, data, "POST");
    put = (url, data) => baseMethod(url, data, "PUT");
    delete = (url, data) => baseMethod(url, data, "DELETE");
}

export default new request();//ES6导出
