import SparkMD5 from "spark-md5-es";
import {percentage} from "../../util/index.js";
import {CHECKING} from "./ScxFSS.js";

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

export {getChunkAndHash, formatFileSize};
