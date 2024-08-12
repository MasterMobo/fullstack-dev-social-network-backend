import APIError from "./APIError";

class BadRequestError extends APIError {
    constructor(message: string) {
        super(message, 400);
    }
}

export default BadRequestError;
