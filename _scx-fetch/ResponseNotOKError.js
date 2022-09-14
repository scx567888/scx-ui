class ResponseNotOKError {

    cause;

    constructor(error) {
        this.cause = error;
    }

}

export {ResponseNotOKError}