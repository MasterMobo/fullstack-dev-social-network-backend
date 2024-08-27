import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import { BadRequestError, NotFoundError } from "../../errors";
import { Group } from "../../models/group";
import { IMemberRequest, MemberRequest } from "../../models/memberRequest";

const createMemberRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    // Check if user exists
    const user = await User.findById(userId).exec();
    if (!user) {
        return next(new NotFoundError("User not found"));
    }

    // Check if group exists
    const group = await Group.findById(groupId).exec();
    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    // Check if user is already a member
    const isMember = group.members.some((member) =>
        member._id.equals(user._id)
    );
    if (isMember) {
        return next(
            new BadRequestError("User is already a member of the group")
        );
    }

    // Check if user has already sent the request to the group
    const existingRequest = await MemberRequest.findOne({
        user: userId,
        groupId,
    });
    if (existingRequest) {
        return next(
            new BadRequestError(
                "A member request is already sent to this group"
            )
        );
    }

    const memberRequest = await MemberRequest.create({
        user: userId,
        groupId,
        status: "pending",
        createdAt: new Date(),
    });

    return res.json({ memberRequest });
};

export default createMemberRequest;
