import { NextFunction, Request, Response } from "express";
import { Admin, IUser } from "../../models/user";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors";
import { Comment } from "../../models/comment";
import { Types } from "mongoose";

const removeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin: IUser = req.signedCookies["user"];
  if (!(await Admin.findById(admin._id))) {
    return next(new UnauthorizedError("User not authorized!"));
  }

  const { commentId } = req.params;

  if (!Types.ObjectId.isValid(commentId)) {
    return next(new BadRequestError("Invalid comment ID"));
  }

  const comment = await Comment.findById(commentId).exec();
  if (!comment) {
    return next(new NotFoundError("Comment not found"));
  }

  await Comment.findByIdAndDelete(comment);

  res.status(200).json({ message: "Comment removed successfully" });
};

export default removeComment;
