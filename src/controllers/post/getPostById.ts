import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError } from "../../errors";

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const { postID } = req.params;

    const post = await Post.findById(postID).exec();

    if (!post) {
        return next(new BadRequestError("Post not found."));
    }

    return res.status(200).json({ posts: [post] });
};

export default getPostById;