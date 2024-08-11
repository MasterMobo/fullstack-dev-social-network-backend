import APIError from "./APIError";

class NotFoundError extends APIError {
    constructor(message: string) {
        super(message, 404);
    }
}

export default NotFoundError;
