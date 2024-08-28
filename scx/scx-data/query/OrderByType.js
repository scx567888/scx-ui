class OrderByType {

    #value


    constructor(value) {
        this.#value = value;
    }
    
    value(){
        return this.#value
    }
    
}

const ASC = new OrderByType("ASC");

const DESC = new OrderByType("DESC");

export {
    ASC,
    DESC,
    OrderByType,
};
