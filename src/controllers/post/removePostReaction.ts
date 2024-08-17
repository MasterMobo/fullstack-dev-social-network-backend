import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import { NotFoundError } from "../../errors";
import { Post } from "../../models/post";

const removePostReaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;
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

    // Check if user has reacted to the post
    const reactionIndex = post.reactions.findIndex((r) =>
        r.users.find((u) => u._id.equals(user._id))
    );

    if (reactionIndex === -1) {
        return next(new NotFoundError("User has not reacted to this post"));
    }

    // Remove user from reaction
    post.reactions[reactionIndex].users = post.reactions[
        reactionIndex
    ].users.filter((u) => !u._id.equals(user._id));

    const newReactions = post.reactions;

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { reactions: newReactions },
        { new: true }
    ).exec();

    return res.json({ post: updatedPost });
};

export default removePostReaction;
