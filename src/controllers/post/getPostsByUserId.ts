import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError } from "../../errors";

const getPostsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;

    try {
        const posts = await Post.find({ userID }).exec();

        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this user" });
        }

        return res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
};

export default getPostsByUserId;