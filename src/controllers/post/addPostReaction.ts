import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError, ConflictError, NotFoundError } from "../../errors";
import { IReaction, allowedReactions } from "../../models/reaction";
import { User } from "../../models/user";

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

    // Check if reaction is valid
    if (!allowedReactions.includes(reaction)) {
        return next(new BadRequestError("Invalid reaction"));
    }

    // Check if user has already reacted to the post
    for (const postReactions of post.reactions) {
        if (postReactions.users.find((u) => u._id.equals(user._id))) {
            return next(
                new ConflictError("User has already reacted to this post")
            );
        }
    }

    // If this no one has reacted to this post with this reaction
    if (!post.reactions.find((r) => r.reaction === reaction)) {
        const newReaction: IReaction = {
            reaction: reaction,
            users: [user],
        };

        post.reactions.push(newReaction);
        await post.save();

        return res.json({ post });
    }

    // If this reaction already exists
    for (const postReactions of post.reactions) {
        if (postReactions.reaction === reaction) {
            postReactions.users.push(user);
        }
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
