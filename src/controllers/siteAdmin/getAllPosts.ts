import { NextFunction, Request, Response } from "express";
import { Admin, IUser } from "../../models/user";
import { UnauthorizedError } from "../../errors";
import { Post } from "../../models/post";

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  const admin: IUser = req.signedCookies["user"];

  if (!(await Admin.findById(admin._id))) {
    return next(new UnauthorizedError("User not authorized!"));
  }

  const posts = await Post.find().populate("user").populate("group").exec();
  res.status(200).json(posts);
};

export default getAllPosts;
