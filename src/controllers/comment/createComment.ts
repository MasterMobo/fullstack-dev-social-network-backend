import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { Types } from "mongoose";
import { Comment, IComment } from "../../models/comment";
import { Post } from "../../models/post";
import NotificationManager from "../notification/models/notificationManager";
const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;
    const { text } = req.body;

    // Check if post exists
    const post = await Post.findById(postId).exec();
    if (!post) {
        return next(new NotFoundError("Post not found"));
    }

    if (!text) {
        return next(new BadRequestError("Post must have text"));
    }

    const user = req.signedCookies["user"];

    const newComment: IComment = {
        postID: new Types.ObjectId(postId),
        user: user._id,
        text: text,
        reactions: [],
        editHistory: [],
    };
    const comment = await Comment.create(newComment);

    if (!post.user._id.equals(user._id)) {
        // If the user is not the post owner, send a notification
        await NotificationManager.getInstance().sendCommentReceivedNotification(
            post.user._id,
            post._id,
            user._id
        );
    }

    res.status(200).json(comment);
};

export default createComment;
