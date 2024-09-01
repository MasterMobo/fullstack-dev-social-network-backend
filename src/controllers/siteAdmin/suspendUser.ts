import { NextFunction, Request, Response } from "express";
import { Admin, IUser, User } from "../../models/user";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../../errors";
import { Types } from "mongoose";

const suspendUser = async (req: Request, res: Response, next: NextFunction) => {
    const admin: IUser = req.signedCookies["user"];

    if (!(await Admin.findById(admin._id))) {
        return next(new UnauthorizedError("User not authorized!"));
    }

    const { userId } = req.params;

    if (!Types.ObjectId.isValid(userId)) {
        return next(new BadRequestError("Invalid user id"));
    }

    const userToSuspend = await User.findById(userId).exec();
    if (!userToSuspend) {
        return next(new NotFoundError("User not found!"));
    }

    const isSuspendingAdmin = await Admin.findById(userToSuspend._id).exec();
    if (isSuspendingAdmin) {
        return next(new BadRequestError("Cannot suspend another site admin"));
    }

    if (userToSuspend.status === "suspended") {
        return next(new BadRequestError("User is already suspended"));
    }

    // Update the user's status to suspended
    await User.findByIdAndUpdate(userId, { status: "suspended" });
    res.status(200).json({ message: "User suspended successfully" });
};

export default suspendUser;
