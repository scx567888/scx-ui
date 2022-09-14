import {HttpHeaderNames} from "./HttpHeaderNames.js";
import {HttpHeaderValues} from "./HttpHeaderValues.js";

class ScxFetchResponseType {

    static ARRAY_BUFFER = "arrayBuffer";
    static BLOB = "blob";
    static FORM_DATA = "formData";
    static JSON = "json";
    static TEXT = "text";
    static AUTO = "auto";

    /**
     * 获取 header 中的 CONTENT_TYPE 判断相应的类型
     * @param headers
     * @param defaultType 优先的返回值
     */
    static getByHeaders(headers, defaultType) {
        if (defaultType && defaultType !== ScxFetchResponseType.AUTO) {
            return defaultType;
        }
        let contentType = headers.get(HttpHeaderNames.CONTENT_TYPE);
        if (contentType == null) {
            return ScxFetchResponseType.ARRAY_BUFFER;
        }
        contentType = contentType.toLowerCase();
        if (contentType.startsWith(HttpHeaderValues.APPLICATION_JSON)) {
            return ScxFetchResponseType.JSON;
        } else if (contentType.startsWith(HttpHeaderValues.TEXT_ANY) || contentType.startsWith(HttpHeaderValues.APPLICATION_XML)) {
            return ScxFetchResponseType.TEXT;
        } else if (contentType.startsWith(HttpHeaderValues.MULTIPART_FORM_DATA)) {
            return ScxFetchResponseType.FORM_DATA;
        } else {
            return ScxFetchResponseType.ARRAY_BUFFER;
        }
    }

}

export {ScxFetchResponseType}