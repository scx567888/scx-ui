class FetchError {

    cause;

    constructor(error) {
        this.cause = error;
    }

}

export {FetchError}