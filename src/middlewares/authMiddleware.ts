import { Response, Request, NextFunction } from "express";
import { UnauthorizedError } from "../errors";
import { IUser } from "../models/user";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Assuming the cookie's content is a user object
    // TODO: Implement the logic to check if the user is authenticated
    // const user: IUser = req.cookies("signedCookies")

    // if (!user) {
    //     next(new UnauthorizedError("401: User not authorized!"))
    // }

    next();
};

export default authMiddleware;
