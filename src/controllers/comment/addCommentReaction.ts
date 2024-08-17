import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { BadRequestError, ConflictError, NotFoundError } from "../../errors";
import { IReaction, allowedReactions } from "../../models/reaction";
import { User } from "../../models/user";

const addCommentReaction = async (
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

    // Check if user has already reacted to the comment
    for (const commentReactions of comment.reactions) {
        if (commentReactions.users.find((u) => u._id.equals(user._id))) {
            return next(
                new ConflictError("User has already reacted to this comment")
            );
        }
    }

    // If this no one has reacted to this comment with this reaction
    if (!comment.reactions.find((r) => r.reaction === reaction)) {
        const newReaction: IReaction = {
            reaction: reaction,
            users: [user],
        };

        comment.reactions.push(newReaction);
        await comment.save();

        return res.json({ comment });
    }

    // If this reaction already exists
    for (const commentReactions of comment.reactions) {
        if (commentReactions.reaction === reaction) {
            commentReactions.users.push(user);
        }
    }

    const newReactions = comment.reactions;

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { reactions: newReactions },
        { new: true }
    ).exec();

    return res.json({ comment: updatedComment });
};

export default addCommentReaction;
