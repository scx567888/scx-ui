import {ScxFetchHeaders} from "./scx-fetch-headers.js";
import {ScxFetchResponseType} from "./scx-fetch-response-type.js";

class ScxFetchResponse {

    headers;
    type;
    url;
    responseType;
    body;

    constructor(headers, type, url, body, responseType) {
        this.headers = headers;
        this.type = type;
        this.url = url;
        this.body = body;
        this.responseType = responseType;
    }

    /**
     *
     * @param responseType
     * @param response
     * @returns {Promise<Blob>|Blob|*|Promise<any>|ArrayBuffer|Promise<ArrayBuffer>|Promise<FormData>}
     */
    static getBodyPromise(responseType, response) {
        if (responseType === ScxFetchResponseType.JSON) {
            return response.json();
        } else if (responseType === ScxFetchResponseType.ARRAY_BUFFER) {
            return response.arrayBuffer();
        } else if (responseType === ScxFetchResponseType.BLOB) {
            return response.blob();
        } else if (responseType === ScxFetchResponseType.FORM_DATA) {
            return response.formData();
        } else if (responseType === ScxFetchResponseType.TEXT) {
            return response.text();
        } else {
            return response.arrayBuffer();
        }
    }

    /**
     *
     * @param response
     * @param defaultResponseType
     * @returns {Promise<unknown>}
     */
    static create(response, defaultResponseType) {
        return new Promise((resolve, reject) => {
            const headers = new ScxFetchHeaders(response.headers);
            const responseType = ScxFetchResponseType.getByHeaders(headers, defaultResponseType);
            ScxFetchResponse.getBodyPromise(responseType, response)
                .then((body) => resolve(new ScxFetchResponse(headers, response.type, response.url, body, responseType)))
                .catch((e) => reject(e));
        });
    }

}

export {ScxFetchResponse};
