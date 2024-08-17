import { NextFunction, Request, Response } from "express";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../../errors";
import { IUser } from "../../models/user";
import { Post } from "../../models/post";
import { IEditHistory } from "../../models/editHistory";

const editPost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { text, visibility } = req.body;

    if (!text && !visibility) {
        return next(new BadRequestError("Nothing to update"));
    }

    const post = await Post.findById(postId).exec();

    // Check if post exists
    if (!post) {
        return next(new NotFoundError("Post not found"));
    }

    // Check if current user is the author of the post
    const user: IUser = req.signedCookies["user"];

    if (!post.userID.equals(user._id)) {
        return next(
            new UnauthorizedError("You are not the author of this post")
        );
    }

    // Update post
    const newEditHistory: IEditHistory = {
        text: text || post.text,
        visibility: visibility || post.visibility,
        updateAt: new Date(),
    };

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            text: text || post.text,
            visibility: visibility || post.visibility,
            editHistory: [...post.editHistory, newEditHistory],
        },
        { new: true }
    ).exec();

    return res.json({ post: updatedPost });
};

export default editPost;
