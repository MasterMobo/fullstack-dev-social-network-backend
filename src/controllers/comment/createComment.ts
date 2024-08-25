import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { Types } from "mongoose";
import { Comment, IComment } from "../../models/comment";
import { Post } from "../../models/post";
const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;
    const { text } = req.body;

    // Check if post exists
    const post = await Post.findById(postId).exec();
    if (!post) {
        return next(new NotFoundError("Post not found"));
    }

    if (!text) {
        return next(new BadRequestError("Post must have text"));
    }

    const newComment: IComment = {
        postID: new Types.ObjectId(postId),
        user: req.signedCookies["user"]._id,
        text: text,
        reactions: [],
        editHistory: [],
    };
    const comment = await Comment.create(newComment);

    res.status(200).json(comment);
};

export default createComment;
