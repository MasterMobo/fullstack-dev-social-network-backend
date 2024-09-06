import { Request, Response, NextFunction } from "express";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../../../errors";
import { IGroup, Group } from "../../../models/group";
import { IUser, Admin } from "../../../models/user";

const deleteGroupRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { groupId } = req.params;
    const admin: IUser = req.signedCookies["user"];

    if (!(await Admin.findById(admin._id))) {
        return next(new UnauthorizedError("401: User not authorized!"));
    }

    if (!groupId) {
        return next(new BadRequestError("Invalid groupId "));
    }
    const group = await Group.findByIdAndDelete(groupId);

    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    res.status(200).json({ message: "Group deleted successfully" });
};

export default deleteGroupRequest;
