import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError } from "../../errors";
import getCurrentPostReaction from "./helpers/getCurrentPostReaction";

const getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { _id: currentUserId } = req.signedCookies["user"];

    const posts = await Post.find({ user: currentUserId })
        .populate("user")
        .populate("group")
        .exec();

    if (!posts) {
        return next(new BadRequestError("Post not found."));
    }

    const responsePosts = posts.map((post) => {
        const currentReaction = getCurrentPostReaction(currentUserId, post);
        return { ...post.toObject(), currentReaction };
    });

    return res.status(200).json({ posts: responsePosts });
};

export default getMyPosts;
