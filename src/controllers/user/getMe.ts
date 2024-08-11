import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../../models/user";
import { NotFoundError } from "../../errors";

const getMe = async (req: Request, res: Response, next: NextFunction) => {
    // Get the user ID from signed cookie
    // TODO: ADD COOKIE AUTHENTICATION
    const userId = req.signedCookies.user._id || "640b1c2945e47f6538232da6";
    const user: IUser | null = await User.findById(userId);

    if (!user) {
        next(new NotFoundError("User not found"));
        return;
    }

    // TODO: Remove password from the response
    return res.json(user);
};

export default getMe;
