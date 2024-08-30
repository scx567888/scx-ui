class FilterMode {
    #value;

    constructor(value) {
        this.#value = value;
    }

    value() {
        return this.#value;
    }

}


const INCLUDED = new FilterMode("INCLUDED");

const EXCLUDED = new FilterMode("EXCLUDED");

export {FilterMode, INCLUDED, EXCLUDED};
