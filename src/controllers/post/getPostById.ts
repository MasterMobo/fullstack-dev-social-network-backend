import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError } from "../../errors";
import getCurrentPostReaction from "./helpers/getCurrentPostReaction";

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const { postID } = req.params;

    let post = await Post.findById(postID)
        .populate("user")
        .populate("group")
        .exec();

    if (!post) {
        return next(new BadRequestError("Post not found."));
    }

    let currentReaction = getCurrentPostReaction(
        req.signedCookies["user"]._id,
        post
    );

    return res
        .status(200)
        .json({ post: { ...post.toObject(), currentReaction } });
};

export default getPostById;
