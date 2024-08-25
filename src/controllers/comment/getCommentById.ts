import { Request, Response, NextFunction } from "express";
import { Comment } from "../../models/comment";
import { NotFoundError } from "../../errors";

const getCommentById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { commentId } = req.params;

    // Check if comment exists
    const comment = await Comment.findById(commentId).populate("user").exec();
    if (!comment) {
        return next(new NotFoundError("Comment not found"));
    }

    return res.json({ comment });
};

export default getCommentById;
