class UploadInfo {

    /**
     * a
     * @type {string}
     */
    fileName = "";

    /**
     * a
     * @type {string}
     */
    previewURL = null;

    /**
     *
     * @type {string}
     */
    downloadURL = null;

    /**
     *
     * @type {number}
     */
    progressValue = 0;

    /**
     * a
     * @type {string}
     */
    progressState = "";

    /**
     * a
     * @type {boolean}
     */
    progressVisible = false;

    /**
     *
     * @type {File}
     */
    file = null;

    /**
     * a
     * @type {string}
     */
    fileID = "";

    /**
     * 上传时间
     * @type {null}
     */
    uploadTime = null;

    /**
     * 文件大小
     * @type {null}
     */
    fileSizeDisplay = null;

    /**
     * 文件实际大小
     * @type {null}
     */
    fileSize = null;

    /**
     * 文件 fssObjectID
     * @type {null}
     */
    fssObjectID = null;

    reset() {
        this.fileName = null;
        this.previewURL = null;
        this.downloadURL = null;
        this.uploadTime = null;
        this.fileSizeDisplay = null;
        this.fileSize = null;
        this.fssObjectID = null;
        return this;
    }

    fill(rawOptions) {
        const {
            fileName,
            previewURL,
            downloadURL,
            uploadTime,
            fileSizeDisplay,
            fileSize,
            fssObjectID,
        } = rawOptions;
        this.fileName = fileName;
        this.previewURL = previewURL;
        this.downloadURL = downloadURL;
        this.uploadTime = uploadTime;
        this.fileSizeDisplay = fileSizeDisplay;
        this.fileSize = fileSize;
        this.fssObjectID = fssObjectID;
        return this;
    }

    copy() {
        return new UploadInfo().fill(this);
    }

}

class ScxFSSHelper {

    /**
     * @type ScxFSS
     */
    scxFSS;

    constructor(scxFSS) {
        this.scxFSS = scxFSS;
    }

    /**
     *  默认的 scx-fss 的 fileInfoHandler
     *
     * @param fileID
     * @returns {Promise<{fileName: string}|{[p: string]: *}>}
     */
    fileInfoHandler(fileID) {
        const previewURL = this.scxFSS.joinImageURL(fileID, {
            w: 150,
            h: 150,
        });
        const downloadURL = this.scxFSS.joinDownloadURL(fileID);
        return new Promise((resolve, reject) => {
            this.scxFSS.info(fileID).then(item => {
                if (item) {
                    resolve({
                        ...item,
                        previewURL,
                        downloadURL,
                    });
                } else {
                    resolve({fileName: "文件无法读取 !!! id : " + fileID});
                }
            }).catch(e => reject(e));
        });
    }

    /**
     * 默认的 scx-fss 的上传 handler
     * @param needUploadFile
     * @param progress
     * @returns {Promise<unknown>}
     */
    uploadHandler(needUploadFile, progress) {
        const onProgress = (state, value) => {
            // todo 这里没有使用 ScxFSS.CHECKING() 而是直接引入字符串的原因
            // todo 请参照 https://github.com/vitejs/vite/issues/7775
            //前 50% 是校验 md5 后 50% 才是真正的文件上传
            if (state === "checking") {
                progress(value * 0.5, "校验中");
            } else if (state === "uploading") {
                progress(50 + value * 0.5, "上传中");
            }
        };
        return new Promise((resolve, reject) => {
            this.scxFSS.upload(needUploadFile, onProgress).then(d => {
                resolve(d.item.fssObjectID);
            }).catch(e => reject(e));
        });
    }

}

export {UploadInfo, ScxFSSHelper};
	
