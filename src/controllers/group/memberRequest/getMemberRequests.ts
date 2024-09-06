import { NextFunction, Request, Response } from "express";
import { Admin, IUser } from "../../../models/user";
import { NotFoundError, UnauthorizedError } from "../../../errors";
import { Group } from "../../../models/group";
import { MemberRequest } from "../../../models/memberRequest";

const getMemberRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Check if group exists
    const { groupId } = req.params;

    const group = await Group.findById(groupId).exec();
    if (!group) {
        return next(new NotFoundError("Group not found!"));
    }

    // Check if current user is the admin of the group
    const { _id: currentUserId } = req.signedCookies["user"];
    const groupAdmin = group.admins.some((admin) =>
        admin._id.equals(currentUserId)
    );

    if (!groupAdmin) {
        return next(new UnauthorizedError("User is not authorized!"));
    }

    const memberRequests = await MemberRequest.find({
        groupId,
        status: "pending",
    })
        .populate("user")
        .exec();
    if (!memberRequests) {
        return next(new NotFoundError("Member request not found"));
    }

    // Respond with the member requests
    return res.json({ requests: memberRequests });
};

export default getMemberRequests;
