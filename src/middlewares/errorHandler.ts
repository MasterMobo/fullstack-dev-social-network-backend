import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { APIError } from "../errors";

const errorHandler: ErrorRequestHandler = (
    err: Error | APIError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof APIError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message, error: err });
};

export default errorHandler;
