import { Request, Response, NextFunction } from "express";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../../errors";
import { IGroup, Group } from "../../models/group";
import { IUser, Admin } from "../../models/user";
import { Types } from "mongoose";

const deleteGroupMember = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { groupId, memberId } = req.params;

    if (!groupId) {
        return next(new BadRequestError("Must provide groupId"));
    }

    if (!memberId) {
        return next(new BadRequestError("Must provide memberId"));
    }

    const memberObjectId = new Types.ObjectId(memberId);
    const group = await Group.findById(groupId);

    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    const groupAdmin: IUser = req.signedCookies["user"];
    const groupAdminObjectId = new Types.ObjectId(groupAdmin._id);

    if (!group.admins[0]._id.equals(groupAdminObjectId)) {
        return next(new UnauthorizedError("401: User not authorized!"));
    }

    if (group.admins[0]._id.equals(memberObjectId)) {
        return next(new BadRequestError("Cannot delete admin"));
    }

    if (groupAdminObjectId.equals(memberObjectId)) {
        return next(new BadRequestError("Cannot delete yourself"));
    }

    const newMembers = group.members.filter(
        (member: IUser) => !member._id.equals(memberObjectId)
    );

    const newGroupMember = await Group.findByIdAndUpdate(
        groupId,
        { members: newMembers },
        { new: true }
    ).exec();

    res.status(200).json(newGroupMember);
};

export default deleteGroupMember;