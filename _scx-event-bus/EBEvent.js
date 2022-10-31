/**
 * 事件总线事件
 */
class EBEvent {
    name;
    event;

    constructor(name, event) {
        this.name = name;
        this.event = event;
    }

}

export {EBEvent}