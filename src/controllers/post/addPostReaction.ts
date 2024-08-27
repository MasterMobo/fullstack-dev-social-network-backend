import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError, ConflictError, NotFoundError } from "../../errors";
import { IReaction, allowedReactions } from "../../models/reaction";
import { User } from "../../models/user";
import removePostReaction from "./removePostReaction";
import getCurrentReaction from "../../middlewares/reactions/getCurrentReaction";

const addPostReaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;
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

    // If reaction is empty, remove the reaction
    if (reaction.length === 0) {
        return removePostReaction(req, res, next);
    }

    // Check if reaction is valid
    if (!allowedReactions.includes(reaction)) {
        return next(new BadRequestError("Invalid reaction"));
    }

    let currentReaction = getCurrentReaction(user._id.toString(), post);

    // Check if user has already reacted with the same reaction, do nothing
    if (reaction === currentReaction) {
        return res.json({ post });
    }

    // Remove user from the previous reaction
    if (currentReaction) {
        post.reactions = post.reactions.map((r: IReaction) => {
            if (r.reaction === currentReaction) {
                r.users = r.users.filter((u) => !u._id.equals(user._id));
            }
            return r;
        });
    }

    const targetReaction = post.reactions.find(
        (r: IReaction) => r.reaction === reaction
    );
    // If no one has reacted with the this reaction, create a new one
    if (!targetReaction) {
        post.reactions.push({
            reaction,
            users: [user],
        });
    } else {
        // If someone has reacted with this reaction, add the user to the list
        targetReaction.users.push(user);
    }

    const newReactions = post.reactions;

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { reactions: newReactions },
        { new: true }
    ).exec();

    return res.json({ post: updatedPost });
};

export default addPostReaction;
