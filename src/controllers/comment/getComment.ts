import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { Comment } from "../../models/comment";
import { Types } from "mongoose";

const getComment = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    // Validate the postId
    if (!Types.ObjectId.isValid(postId)) {
        return next(new BadRequestError("Invalid post id"));
    }

    // Find comments by postId
    const comments = await Comment.find({ postID: postId })
        .populate("user")
        .exec();

    if (!comments) {
        return next(new NotFoundError("Comments not found"));
    }

    // Respond with the comments
    return res.json({ comments });
};

export default getComment;
