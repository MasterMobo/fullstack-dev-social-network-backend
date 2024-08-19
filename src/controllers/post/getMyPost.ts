import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError } from "../../errors";

const getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
  const { _id: currentUserId } = req.signedCookies["user"];

  const posts = await Post.find({ userID: currentUserId }).exec();

  if (!posts) {
    return next(new BadRequestError("Post not found."));
  }

  return res.status(200).json({ posts });
};

export default getMyPosts;
