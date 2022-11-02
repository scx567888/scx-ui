/**
 * 前后台发送消息 (websocket) 的封装体
 */
class WSMessage {
    address;
    body;
    headers;
    replyAddress;

    constructor(address, body, headers) {
        this.address = address;
        this.body = body;
        this.headers = headers;
    }

}

export {WSMessage}