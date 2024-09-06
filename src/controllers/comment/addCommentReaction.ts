import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { BadRequestError, ConflictError, NotFoundError } from "../../errors";
import { IReaction, allowedReactions } from "../../models/reaction";
import { User } from "../../models/user";
import getCurrentReaction from "../../middlewares/reactions/getCurrentReaction";
import removeCommentReaction from "./removeCommentReaction";

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

    // If reaction is empty, remove the reaction
    if (reaction.length === 0) {
        return removeCommentReaction(req, res, next);
    }

    // Check if reaction is valid
    if (!allowedReactions.includes(reaction)) {
        return next(new BadRequestError("Invalid reaction"));
    }

    let currentReaction = getCurrentReaction(user._id.toString(), comment);

    // Check if user has already reacted with the same reaction, do nothing
    if (reaction === currentReaction) {
        return res.json({ comment });
    }

    // Remove user from the previous reaction
    if (currentReaction) {
        comment.reactions = comment.reactions.map((r: IReaction) => {
            if (r.reaction === currentReaction) {
                r.users = r.users.filter((u) => !u._id.equals(user._id));
            }
            return r;
        });
    }

    const targetReaction = comment.reactions.find(
        (r: IReaction) => r.reaction === reaction
    );

    // If no one has reacted with the this reaction, create a new one
    if (!targetReaction) {
        comment.reactions.push({
            reaction,
            users: [user],
        });
    } else {
        // If someone has reacted with this reaction, add the user to the list
        targetReaction.users.push(user);
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
