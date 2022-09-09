/**
 * 生成 uuid
 * @returns {string}
 */
function getUUID() {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substring(uuid.lastIndexOf("/") + 1);
}

export {
    getUUID
}
