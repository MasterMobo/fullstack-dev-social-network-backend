import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors";
import { IUser, User } from "../../models/user";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user: IUser | null = await User.findById(userId);

    if (!user) {
        next(new NotFoundError("User not found"));
        return;
    }

    // TODO: Remove password from the response
    return res.json(user);
};

export default getProfile;
