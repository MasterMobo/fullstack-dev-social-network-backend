import { NextFunction, Request, Response } from "express";
import { Admin, IUser, User } from "../../models/user";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors";
import { Types } from "mongoose";

const resumeUser = async (req: Request, res: Response, next: NextFunction) => {
  const admin: IUser = req.signedCookies["user"];

  if (!(await Admin.findById(admin._id))) {
    return next(new UnauthorizedError("User not authorized!"));
  }

  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    return next(new BadRequestError("Invalid user id"));
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return next(new NotFoundError("User not found!"));
  }

  const isSiteAdmin = await Admin.findById(user._id).exec();
  if (isSiteAdmin) {
    return next(
      new BadRequestError("Can't perform action! User is a site admin!")
    );
  }

  if (user.status === "active") {
    return next(new BadRequestError("User is already active"));
  }

  await User.findByIdAndUpdate(userId, { status: "active" });
  res.status(200).json({ message: "User reactivated successfully" });
};

export default resumeUser;
