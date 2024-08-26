class LogicType {

    #value;

    constructor(value) {
        this.#value = value;
    }

    value() {
        return this.#value;
    }

}

const _OR = new LogicType("OR");
const _AND = new LogicType("AND");

export {
    _OR,
    _AND,
};
