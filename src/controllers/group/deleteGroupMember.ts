import { Request, Response, NextFunction } from "express";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../../errors";
import { IGroup, Group } from "../../models/group";
import { IUser, Admin } from "../../models/user";

const deleteGroupMember = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    if (!groupId) {
        return next(new BadRequestError("Must provide groupId"));
    }

    if (!userId) {
        return next(new BadRequestError("Must provide userId"));
    }

    const group = await Group.findById(groupId);

    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    const groupAdmin: IUser = req.signedCookies["user"];

    if (group.admins[0]._id != groupAdmin._id) {
        return next(new UnauthorizedError("401: User not authorized!"));
    }

    const newMembers = group.members.filter(
        (member: IUser) => member._id != userId
    );

    res.status(200).json(group);
};

export default deleteGroupMember;
