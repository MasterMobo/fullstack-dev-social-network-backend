import { Request, Response, NextFunction } from "express";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../../../errors";
import { IGroup, Group } from "../../../models/group";
import { IUser, Admin } from "../../../models/user";
const getAllGroupRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const admin: IUser = req.signedCookies["user"];
    if (!(await Admin.findById(admin._id))) {
        return next(new UnauthorizedError("401: User not authorized!"));
    }

    const groups = await Group.find({ status: "pending" });
    res.status(200).json(groups);
};

export default getAllGroupRequest;
