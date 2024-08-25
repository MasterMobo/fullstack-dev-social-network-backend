import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import { NotFoundError } from "../../errors";
import { Group } from "../../models/group";
import { MemberRequest } from "../../models/memberRequest";

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

  const newMemberRequest = new MemberRequest({
    userId,
    groupId,
    status: "pending",
    createdAt: new Date(),
  });

  const memberRequest = await MemberRequest.create(newMemberRequest);

  return res.json({ memberRequest });
};

export default createMemberRequest;
