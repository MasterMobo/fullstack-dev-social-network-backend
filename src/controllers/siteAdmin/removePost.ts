import { NextFunction, Request, Response } from "express";
import { IUser } from "../../models/user";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors";
import { Types } from "mongoose";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";

const removePost = async (req: Request, res: Response, next: NextFunction) => {
  const admin: IUser = req.signedCookies["user"];
  if (!admin) {
    return next(new UnauthorizedError("User not authorized"));
  }

  const { postId } = req.params;
  if (!Types.ObjectId.isValid(postId)) {
    return next(new BadRequestError("Invalid post id"));
  }

  const post = await Post.findById(postId).exec();
  if (!post) {
    return next(new NotFoundError("Post not found"));
  }

  // Delete the post
  await Post.findByIdAndDelete(postId);

  // Delete all comments associated with the post
  await Comment.deleteMany({ postID: postId });

  res
    .status(200)
    .json({ message: "Post and associated comments removed successfully" });
};

export default removePost;
