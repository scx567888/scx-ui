import SparkMD5 from "spark-md5-es";
import {joinURL, percentage} from "../util/index.js";
import {JsonVOError} from "./scx-req.js";
import {inject} from "vue";


const UPLOAD_URL = "api/fss/upload";
const LIST_INFO_URL = "api/fss/list-info";
const INFO_URL = "api/fss/info";
const RAW_URL = "api/fss/raw/";
const IMAGE_URL = "api/fss/image/";
const DOWNLOAD_URL = "api/fss/download/";
const CHECK_ANY_FILE_EXISTS_BY_HASH_URL = "api/fss/check-any-file-exists-by-hash";

const CHECKING = "checking";
const UPLOADING = "uploading";

const NEED_MORE = "need-more";
const UPLOAD_SUCCESS = "upload-success";
const NO_ANY_FILE_EXISTS_FOR_HASH = "no-any-file-exists-for-hash";

/**
 * req
 */
class ScxFSS {
    scxReq;
    maxUploadSize = 10 * 1024 * 1024 * 1024;//最大上传文件 写死 10GB
    chunkSize = 2 * 1024 * 1024;//切片大小 这里写死 2MB

    /**
     * req 对象
     * @param scxReq {ScxReq}
     */
    constructor(scxReq) {
        this.scxReq = scxReq;
    }

    static defaultOnProgress(state, value) {
        console.log({
            state: state,
            value: value,
        });
    }

    /**
     * 上传到 fss 中
     * @param file 待上传的文件
     * @param onProgress 上传进度回调
     * @returns {Promise<unknown>} r
     */

    upload(file, onProgress = ScxFSS.defaultOnProgress) {
        return new Promise((resolve, reject) => {
            //先判断待上传的文件是否为空或者是否为 File 对象
            if (file == null || !(file instanceof File)) {
                reject("文件不能为空并且类型必须为文件 !!!");
                return;
            }
            //判断文件大小是否超出最大限制
            if (file.size > this.maxUploadSize) {
                reject("文件不能大于 " + formatFileSize(this.maxUploadSize) + " !!! 问题文件 : " + file.name);
                return;
            }
            //开始获取 md5和 分块
            getChunkAndHash(file, this.chunkSize, onProgress).then(chunkAndMD5 => {
                const fileName = file.name;
                const fileSize = file.size;
                const chunk = chunkAndMD5.chunk;
                const hash = chunkAndMD5.hash;
                let i = 0;

                //创建上传方法
                const uploadNext = () => {
                    //设置进度条 此处由已上传区块数量和全部区块数量计算而得
                    onProgress(UPLOADING, percentage(i, chunk.length));
                    const uploadFormData = new FormData();
                    uploadFormData.append("fileName", fileName);
                    uploadFormData.append("fileData", chunk[i]);
                    uploadFormData.append("fileSize", fileSize + "");
                    uploadFormData.append("fileHash", hash);
                    uploadFormData.append("chunkLength", chunk.length + "");
                    uploadFormData.append("nowChunkIndex", i + "");

                    //向后台发送请求
                    this.scxReq.post(UPLOAD_URL, uploadFormData).then(data => {
                        //这里因为有断点续传的功能所以可以直接设置 i 以便跳过已经上传过的区块
                        if (data.type === NEED_MORE) {
                            i = data.item;
                            uploadNext();
                        } else if (data.type === UPLOAD_SUCCESS) {
                            onProgress(UPLOADING, 100);
                            resolve(data);
                        } else { //这里就属于返回一些别的 类型了 我们虽然不知道是啥,但肯定不对 所以返回错误
                            reject(data);
                        }
                    }).catch(e => reject(e));
                };

                //这里先检查一下服务器是否已经有相同MD5的文件了 有的话就不传了
                this.scxReq.post(CHECK_ANY_FILE_EXISTS_BY_HASH_URL, {
                    fileName,
                    fileSize,
                    fileHash: hash,
                }).then(data => {
                    //这里表示服务器已经有这个文件了
                    onProgress(UPLOADING, 100);
                    resolve(data);
                }).catch(e => {//这里表示服务器没找到这个文件 还是老老实实的传吧
                    //这里错误的种类比较多 也可能是网络错误或者权限错误啥的 这里判断一下先
                    if (e instanceof JsonVOError && e.message === NO_ANY_FILE_EXISTS_FOR_HASH) {
                        //开始递归上传
                        uploadNext();
                    } else {
                        reject(e);
                    }
                });

            }).catch(e => reject(e));
        });
    };

    /**
     *根据文件 id 获取文件基本信息
     * @param fssObjectID s
     * @returns {Promise<unknown>}
     */
    info(fssObjectID) {
        return new Promise((resolve, reject) => {
            this.scxReq.post(INFO_URL, {fssObjectID}).then(data => {
                resolve(data ? new FSSObject(data) : null);
            }).catch(e => {
                reject(e);
            });
        });
    };

    /**
     * a
     * @param fssObjectIDs {Array} a
     * @returns {Promise<unknown>} a
     */
    listInfo(fssObjectIDs) {
        return new Promise((resolve, reject) => {
            this.scxReq.post(LIST_INFO_URL, {fssObjectIDs}).then(data => {
                const fssObjectList = data.map(i => new FSSObject(i));
                resolve(fssObjectList);
            }).catch(e => {
                reject(e);
            });
        });
    };

    /**
     * 获取 raw url
     * @param fssObjectID
     */
    joinRawURL(fssObjectID) {
        return joinURL(this.scxReq.baseURL, RAW_URL, fssObjectID).toString();
    };

    /**
     * 获取 img url
     * @param fssObjectID
     * @param options {JoinImageURLOptions}
     */
    joinImageURL(fssObjectID, options = {}) {
        const url = joinURL(this.scxReq.baseURL, IMAGE_URL, fssObjectID);
        const {
            w,
            h,
            t,
            width = w,
            height = h,
            type = t,
        } = options;
        if (width || height || type) {
            if (width) {
                url.searchParams.set("w", width + "");
            }
            if (height) {
                url.searchParams.set("h", height + "");
            }
            if (type) {
                url.searchParams.set("t", type);
            }
        }
        return url.toString();
    };

    /**
     * 获取 download url
     * @param fssObjectID
     */
    joinDownloadURL(fssObjectID) {
        return joinURL(this.scxReq.baseURL, DOWNLOAD_URL, fssObjectID).toString();
    };

    install(app) {
        app.provide(scxFSSKey, this);
    }

}

/**
 * 格式化显示文件大小
 * @param value
 * @returns {string}
 */
function formatFileSize(value) {
    if (null == value || value === "") {
        return "0 Bytes";
    }
    const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index;
    const srcSize = parseFloat(value);
    index = Math.floor(Math.log(srcSize) / Math.log(1024));
    let size = srcSize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
}

/**
 * 获取 分块和 MD5
 * @param file
 * @param chunkSize
 * @param onProgress
 * @returns {Promise<unknown>}
 */
function getChunkAndHash(file, chunkSize, onProgress) {
    return new Promise((resolve, reject) => {
        //创建一个对象先
        const chunkAndHash = {
            chunk: [],
            hash: "",
        };
        //不需要切割 (适用于文件大小 < 分块大小的情况, 因为比较常见 所以单独做处理)
        const noNeedSlice = file.size <= chunkSize;
        //计算需要分块的数量
        const chunks = Math.ceil(file.size / chunkSize);
        //当前分块
        let currentChunk = 0;
        //创建 MD5 校验对象
        const spark = new SparkMD5.ArrayBuffer();
        //创建文件读取对象
        const fileReader = new FileReader();

        //设置加载文件回调
        fileReader.onload = (e) => {
            //设置计算MD5的进度
            onProgress(CHECKING, percentage(currentChunk, chunks));
            //读取
            spark.append(e.target.result);
            currentChunk = currentChunk + 1;
            //还没有读完
            if (currentChunk < chunks) {
                loadNext();
            } else { //读完了 赋值MD5 并返回
                chunkAndHash.hash = spark.end(false);
                //设置校验 md5 为 100%
                onProgress(CHECKING, 100);
                resolve(chunkAndHash);
            }
        };

        //发生错误
        fileReader.onerror = () => reject();

        //加载区块方法
        const loadNext = () => {
            let tempFileChunk;
            if (noNeedSlice) { // 不切割
                tempFileChunk = file;
            } else { // 按照 分块的大小进行切割文件
                // 获取起始位置字节数
                const start = currentChunk * chunkSize;
                // 获取结束位置字节数
                const end = Math.min(start + chunkSize, file.size);
                tempFileChunk = file.slice(start, end);
            }
            // 将切割后的区块放入 fileInfo 对象的 chunk 中以便之后使用
            chunkAndHash.chunk.push(tempFileChunk);
            // 读取 (这里起始就是走的 fileReader.onload 方法)
            fileReader.readAsArrayBuffer(tempFileChunk);
        };

        //开始加载
        loadNext();
    });
}


class FSSObject {
    fssObjectID;//文件的 id
    fileName;//文件的名称
    uploadTime;//上传时间
    fileHash;//文件 hash
    fileSizeDisplay;//文件大小 格式化值
    fileSize;//文件大小

    constructor({
                    fssObjectID,
                    fileName,
                    uploadTime,
                    fileHash,
                    fileSizeDisplay,
                    fileSize,
                }) {
        this.fssObjectID = fssObjectID;
        this.fileName = fileName;
        this.uploadTime = uploadTime;
        this.fileHash = fileHash;
        this.fileSizeDisplay = fileSizeDisplay;
        this.fileSize = fileSize;
    }
}

class JoinImageURLOptions {

    /**
     * width 的简写形式
     * @type {Number}
     */
    w;

    /**
     * height 的简写形式
     * @type {Number}
     */
    h;

    /**
     * type 的简写形式
     * @type {String}
     */
    t;

    /**
     * 优先级大于 w
     * @type {Number}
     */
    width;

    /**
     * 优先级大于 h
     * @type {Number}
     */
    height;

    /**
     * 优先级大于 t
     * @type {String}
     */
    type;
}


/**
 *
 * @type {string}
 */
const scxFSSKey = "scx-fss";

/**
 *
 * @returns {ScxFSS}
 */
function useScxFSS() {
    return inject(scxFSSKey);
}

export {
    scxFSSKey,
    useScxFSS,
    ScxFSS,
    FSSObject,
    formatFileSize,
    getChunkAndHash,
    JoinImageURLOptions,
    CHECKING,
    UPLOADING,
};
