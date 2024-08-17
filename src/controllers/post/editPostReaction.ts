import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import { BadRequestError, NotFoundError } from "../../errors";
import { Post } from "../../models/post";
import { allowedReactions } from "../../models/reaction";

const editPostReaction = async (
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

    // Check if reaction is valid
    if (!allowedReactions.includes(reaction)) {
        return next(new BadRequestError("Invalid reaction"));
    }

    // Check if user never reacted to the post
    const oldReactionIndex = post.reactions.findIndex((r) =>
        r.users.find((u) => u._id.equals(user._id))
    );

    if (oldReactionIndex === -1) {
        return next(new NotFoundError("User has not reacted to this post"));
    }

    // Update reaction
    // Remove user from old reaction
    post.reactions[oldReactionIndex].users = post.reactions[
        oldReactionIndex
    ].users.filter((u) => !u._id.equals(user._id));

    // Add user to new reaction
    const newReactionIndex = post.reactions.findIndex(
        (r) => r.reaction === reaction
    );

    if (newReactionIndex === -1) {
        // If this reaction does not exist
        post.reactions.push({
            reaction,
            users: [user],
        });
    } else {
        post.reactions[newReactionIndex].users.push(user);
    }

    const newReactions = post.reactions;

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { reactions: newReactions },
        { new: true }
    ).exec();

    return res.json({ post: updatedPost });
};

export default editPostReaction;
