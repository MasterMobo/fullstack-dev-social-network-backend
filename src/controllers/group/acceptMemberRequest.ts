import { NextFunction, Request, Response } from "express";
import { Admin, IUser } from "../../models/user";
import { NotFoundError, UnauthorizedError } from "../../errors";
import { Group } from "../../models/group";
import { MemberRequest } from "../../models/memberRequest";

const acceptMemberRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin: IUser = req.signedCookies["user"];

  if (!(await Admin.findById(admin._id).exec())) {
    return next(new UnauthorizedError("User is not authorized!"));
  }

  const { groupId, requestId } = req.params;
  if (!(await Group.findById(groupId).exec())) {
    return next(new NotFoundError("Group not found!"));
  }

  const memberRequest = await MemberRequest.findById(requestId).exec();
  if (!memberRequest) {
    return next(new NotFoundError("Member request not found!"));
  }

  const status = req.body;

  memberRequest.status = status;
  await memberRequest!.save();

  res.status(200).json({ request: memberRequest });
};

export default acceptMemberRequest;
