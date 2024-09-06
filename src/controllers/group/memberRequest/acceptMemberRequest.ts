import { NextFunction, Request, Response } from "express";
import { Admin, IUser, User } from "../../../models/user";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../../../errors";
import { Group } from "../../../models/group";
import { MemberRequest } from "../../../models/memberRequest";

const acceptMemberRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { groupId, requestId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["accepted", "declined"].includes(status)) {
        return next(new BadRequestError("Invalid status provided!"));
    }

    // Check if group exists
    const group = await Group.findById(groupId).exec();
    if (!group) {
        return next(new NotFoundError("Group not found!"));
    }

    // Check if current user is the group admin
    const { _id: currentUserId } = req.signedCookies["user"];
    const groupAdmin = group.admins.some((admin) =>
        admin._id.equals(currentUserId)
    );

    if (!groupAdmin) {
        return next(new UnauthorizedError("User is not group admin!"));
    }

    // Check if member request exists
    const memberRequest = await MemberRequest.findById(requestId).exec();
    if (!memberRequest) {
        return next(new NotFoundError("Member request not found!"));
    }

    // Check if member request is already processed
    if (memberRequest.status !== "pending") {
        return next(
            new BadRequestError("Member request is already processed!")
        );
    }

    // Check if member exists
    const member = await User.findById(memberRequest.user).exec();
    if (!member) {
        return next(new NotFoundError("Member not found!"));
    }

    // Check if member is already a member of the group
    const isMember = group.members.some((m) => m._id.equals(member._id));
    if (isMember) {
        return next(
            new BadRequestError("User is already a member of the group")
        );
    }

    if (status === "accepted") {
        // Update member request status
        memberRequest.status = "accepted";
        await memberRequest.save();

        // Add the user to the group members
        group.members.push(member);
        await group.save();
    } else if (status === "declined") {
        // Update member request status
        memberRequest.status = "declined";
        await memberRequest.save();

        // Delete the member request
        await MemberRequest.findByIdAndDelete(requestId).exec();
    }

    return res.status(200).json({ request: memberRequest });
};

export default acceptMemberRequest;
