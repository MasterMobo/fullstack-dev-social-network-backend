import { Response, Request, NextFunction } from "express";
import { UnauthorizedError } from "../errors";
import { IUser } from "../models/user";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.signedCookies["user"];

    if (!user) {
        return next(new UnauthorizedError("401: User not authorized!"));
    }

    next();
};

export default authMiddleware;
