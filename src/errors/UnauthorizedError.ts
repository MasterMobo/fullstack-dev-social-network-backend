import APIError from "./APIError";

class UnauthorizedError extends APIError {
    constructor(message: string) {
        super(message, 401);
    }
}

export default UnauthorizedError;
