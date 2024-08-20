import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { Post } from "../../models/post";

const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;

  const post = await Post.findById(postId).populate("comments").exec();

  if (!post) {
    return next(new BadRequestError("Post not found."));
  }

  res.status(200).json({ comments: post.comments });
};

export default getComment;
