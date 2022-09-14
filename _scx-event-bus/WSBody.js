/**
 * 前后台发送消息 (websocket) 的封装体
 */
class WSBody {
    name;
    data;

    constructor(name, data) {
        this.name = name;
        this.data = data;
    }
}

export {WSBody}