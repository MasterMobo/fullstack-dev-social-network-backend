import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import { Comment } from "../../models/comment";
import { NotFoundError } from "../../errors";
import { Post } from "../../models/post";

const removeCommentReaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId,commentId } = req.params;
    const { userId } = req.body;

    // Check if user exists
    const user = await User.findById(userId).exec();
    if (!user) {
        return next(new NotFoundError("User not found"));
    }

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
        return next(new NotFoundError("Post not found"));
    }
    // Check if comment exists
    const comment = await Comment.findById(commentId).exec();
    if (!comment) {
        return next(new NotFoundError("Comment not found"));
    }
    // Check if user has reacted to the post
    const reactionIndex = comment.reactions.findIndex((r) =>
        r.users.find((u) => u._id.equals(user._id))
    );

    if (reactionIndex === -1) {
        return next(new NotFoundError("User has not reacted to this comment"));
    }

    // Remove user from reaction
    comment.reactions[reactionIndex].users = comment.reactions[
        reactionIndex
    ].users.filter((u) => !u._id.equals(user._id));

    const newReactions = comment.reactions;

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { reactions: newReactions },
        { new: true }
    ).exec();

    return res.json({ comment: updatedComment });
};

export default removeCommentReaction;
