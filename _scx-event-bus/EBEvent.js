/**
 * 事件总线事件
 */
class EBEvent {
    name;
    event;
    isWSEvent;

    constructor(name, event, isWSEvent) {
        this.name = name;
        this.event = event;
        this.isWSEvent = isWSEvent;
    }
}

export {EBEvent}