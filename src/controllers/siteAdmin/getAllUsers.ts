import { NextFunction, Request, Response } from "express";
import { Admin, IUser, User } from "../../models/user";
import { BadRequestError, UnauthorizedError } from "../../errors";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const admin: IUser = req.signedCookies["user"];
    const { status } = req.query;

    if (status && status !== "active" && status !== "suspended") {
        return next(new BadRequestError("Invalid status!"));
    }

    if (!(await Admin.findById(admin._id))) {
        return next(new UnauthorizedError("User not authorized!"));
    }

    let users: IUser[];

    if (status) {
        users = await User.find({ status: status }).exec();
    } else {
        users = await User.find().exec();
    }

    res.status(200).json({ users });
};

export default getAllUsers;
