function initBaseURL(url) {
    const baseURL = new URL(url);
    if (baseURL.protocol === "https:") {
        baseURL.protocol = "wss:";
    } else if (baseURL.protocol === "http:") {
        baseURL.protocol = "ws:";
    }
    return baseURL;
}

export {initBaseURL};
