class LogicType {

    #value;

    constructor(value) {
        this.#value = value;
    }

    value() {
        return this.#value;
    }

}

const OR = new LogicType("OR");
const AND = new LogicType("AND");

export {
    OR,
    AND,
    LogicType
};
