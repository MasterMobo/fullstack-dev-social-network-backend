import { Request, Response, NextFunction } from "express";
import { Comment } from "../../models/comment";
import { NotFoundError } from "../../errors";
import getCurrentReaction from "../../middlewares/reactions/getCurrentReaction";

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

    // Get the current reaction of the user
    const currentReaction = getCurrentReaction(
        req.signedCookies["user"]._id,
        comment
    );
    const resComment = { ...comment.toObject(), currentReaction };

    return res.json({ comment: resComment });
};

export default getCommentById;
