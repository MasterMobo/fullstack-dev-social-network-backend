import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../../models/user";
import { NotFoundError } from "../../errors";

const getMe = async (req: Request, res: Response, next: NextFunction) => {
    const { _id: userId } = req.signedCookies["user"];
    const user = await User.findById(userId);

    if (!user) {
        next(new NotFoundError("User not found"));
        return;
    }

    return res.json({ user });
};

export default getMe;
