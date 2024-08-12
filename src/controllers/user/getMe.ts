import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../../models/user";
import { NotFoundError } from "../../errors";

const getMe = async (req: Request, res: Response, next: NextFunction) => {
    // Get the user ID from signed cookie
    // TODO: ADD COOKIE AUTHENTICATION
    // const userId = req.signedCookies.user._id;
    const user: IUser | null = await User.findById("66ba163105cd62c8df9e3922");

    if (!user) {
        next(new NotFoundError("User not found"));
        return;
    }

    // TODO: Remove password from the response
    return res.json({ user });
};

export default getMe;
