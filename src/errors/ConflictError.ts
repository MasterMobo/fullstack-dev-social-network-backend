import APIError from "./APIError";

class ConflictError extends APIError {
    constructor(message: string) {
        super(message, 409);
    }
}

export default ConflictError;
