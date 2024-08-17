import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import { Comment } from "../../models/comment";
import { BadRequestError, NotFoundError } from "../../errors";
import { Post } from "../../models/post";
import { allowedReactions } from "../../models/reaction";

const editCommentReaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId, commentId } = req.params;
    const { userId, reaction } = req.body;

    // Check if user exists
    const user = await User.findById(userId).exec();
    if (!user) {
        return next(new NotFoundError("User not found"));
    }

    // Check if post exists
    const post = await Post.findById(postId).exec();
    if (!post) {
        return next(new NotFoundError("Post not found"));
    }
    // Check if comment exists
    const comment = await Comment.findById(commentId).exec();
    if (!comment) {
        return next(new NotFoundError("Comment not found"));
    }
    // Check if reaction is valid
    if (!allowedReactions.includes(reaction)) {
        return next(new BadRequestError("Invalid reaction"));
    }

    // Check if user never reacted to the comment
    const oldReactionIndex = comment.reactions.findIndex((r) =>
        r.users.find((u) => u._id.equals(user._id))
    );

    if (oldReactionIndex === -1) {
        return next(new NotFoundError("User has not reacted to this comment"));
    }

    // Update reaction
    // Remove user from old reaction
    comment.reactions[oldReactionIndex].users = comment.reactions[
        oldReactionIndex
    ].users.filter((u) => !u._id.equals(user._id));

    // Add user to new reaction
    const newReactionIndex = comment.reactions.findIndex(
        (r) => r.reaction === reaction
    );

    if (newReactionIndex === -1) {
        // If this reaction does not exist
        comment.reactions.push({
            reaction,
            users: [user],
        });
    } else {
        comment.reactions[newReactionIndex].users.push(user);
    }

    const newReactions = comment.reactions;

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { reactions: newReactions },
        { new: true }
    ).exec();

    return res.json({ comment: updatedComment });
};

export default editCommentReaction;
