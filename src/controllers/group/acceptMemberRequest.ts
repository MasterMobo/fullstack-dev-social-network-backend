import { NextFunction, Request, Response } from "express";
import { Admin, IUser, User } from "../../models/user";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors";
import { Group } from "../../models/group";
import { MemberRequest } from "../../models/memberRequest";

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
  const groupAdmin = group.admins.some(
    (admin) => admin._id.toString() === currentUserId
  );

  if (!groupAdmin) {
    return next(new UnauthorizedError("User is not authorized!"));
  }

  // Check if member request exists
  const memberRequest = await MemberRequest.findById(requestId).exec();
  if (!memberRequest) {
    return next(new NotFoundError("Member request not found!"));
  }

  // Check if member exists
  const member = await User.findById(memberRequest.userId).exec();
  if (!member) {
    return next(new NotFoundError("Member not found!"));
  }

  if (status === "accepted") {
    // Update the member request status to 'accepted'
    await MemberRequest.findByIdAndUpdate(requestId, { status: "accepted" });

    // Add the user to the group members
    if (
      !group.members.some(
        (member) => member._id.toString() === memberRequest.userId.toString()
      )
    ) {
      group.members.push(member);
      await group.save();
    }
  } else if (status === "declined") {
    // Delete the member request
    await MemberRequest.findByIdAndDelete(requestId);
  }

  res.status(200).json({ request: memberRequest });
};

export default acceptMemberRequest;
