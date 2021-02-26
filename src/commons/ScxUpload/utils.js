// 文件校验方法
import request from "../../utils/request";
import scxConfig from "../../../scx.config";

function validateFile(file) {
    return request.post(scxConfig.baseApi + '/api/upload/validateFile', file).then(res => res)
}

// 提交文件方法,将参数转换为FormData, 然后通过 request 发起请求
function postFile(param) {
    const formData = new FormData()
    for (let key in param) {
        formData.append(key, param[key])
    }
    return request.post(scxConfig.baseApi + '/api/upload', formData)
}


// 文件分块,利用Array.prototype.slice方法
function splitFile(file, eachSize, chunks) {
    return new Promise((resolve, reject) => {
        try {
            //开一个新线程
            setTimeout(() => {
                const fileChunk = []
                for (let chunk = 0; chunks > 0; chunks--) {
                    fileChunk.push(file.slice(chunk, chunk + eachSize))
                    chunk += eachSize
                }
                resolve(fileChunk)
            }, 0)
        } catch (e) {
            reject(new Error('文件切块发生错误'))
        }
    })
}

export {
    validateFile,
    postFile,
    splitFile
}