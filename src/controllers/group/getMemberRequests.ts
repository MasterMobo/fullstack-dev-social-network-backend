import { NextFunction, Request, Response } from "express";
import { Admin, IUser } from "../../models/user";
import { NotFoundError, UnauthorizedError } from "../../errors";
import { Group } from "../../models/group";
import { MemberRequest } from "../../models/memberRequest";

const getMemberRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if current user is admin
  const admin: IUser = req.signedCookies["users"];
  if (!(await Admin.findById(admin._id).exec())) {
    return next(new UnauthorizedError("User is not authorized!"));
  }

  const groupId = req.body;

  const group = await Group.findById(groupId).exec();
  if (!group) {
    return next(new NotFoundError("Group not found!"));
  }

  const memberRequests = await MemberRequest.find({ groupId }).exec();
  if (!memberRequests) {
    return next(new NotFoundError("Member request not found"));
  }

  // Respond with the member requests
  return res.json({ requests: memberRequests });
};

export default getMemberRequests;
