import { NextFunction, Request, Response } from "express";
import { Admin, IUser, User } from "../../models/user";
import { UnauthorizedError } from "../../errors";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const admin: IUser = req.signedCookies["user"];

    if (!(await Admin.findById(admin._id))) {
        return next(new UnauthorizedError("User not authorized!"));
    }

    const users = await User.find().exec();
    res.status(200).json({ users });
};

export default getAllUsers;
