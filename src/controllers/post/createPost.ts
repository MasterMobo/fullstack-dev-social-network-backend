import { NextFunction, Request, Response } from "express";
import { IPost, Post } from "../../models/post";
import { IUser, User } from "../../models/user";
import uploadImages from "../upload/uploadImages";
import { BadRequestError, NotFoundError } from "../../errors";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, text, visibility } = req.body;
    const images = req.files as Express.Multer.File[];

    if (!text) {
        return next(new BadRequestError("Post must have text"));
    }

    // Check if user exists
    const user: IUser | null = await User.findById(userId).exec();

    if (!user) {
        return next(new NotFoundError("User not found"));
    }

    const imageUrls = await uploadImages(req, res, next);

    if (!imageUrls) {
        return;
    }

    const newPost: IPost = {
        userID: userId,
        text: text,
        visibility: visibility,
        images: imageUrls,
        reactions: [],
        editHistory: [],
        postedAt: new Date(),
    };

    const post = await Post.create(newPost);

    return res.json({ post });
};

export default createPost;
