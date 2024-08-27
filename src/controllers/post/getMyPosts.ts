import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError } from "../../errors";

const getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { _id: currentUserId } = req.signedCookies["user"];

    const posts = await Post.find({ user: currentUserId })
        .populate("user")
        .populate("group")
        .sort({ postedAt: -1 })
        .exec();

    if (!posts) {
        return next(new BadRequestError("Post not found."));
    }

    // Pass the posts to the next middleware
    res.locals.posts = posts.map((post) => post.toObject());
    next();
};

export default getMyPosts;
