import { Request, Response } from "express";
import { IPost } from "../../models/post";
import getCurrentReaction from "./getCurrentReaction";
import { IComment } from "../../models/comment";

const attachCurrentPostReaction = (req: Request, res: Response) => {
    const posts: [IPost] = res.locals.posts;

    const currentUserId = req.signedCookies["user"]._id;

    const postsWithReactions = posts.map((post) => {
        const currentReaction = getCurrentReaction(currentUserId, post);
        return { ...post, currentReaction };
    });

    return res.json({ posts: postsWithReactions });
};

const attachCurrentCommentReaction = (req: Request, res: Response) => {
    const comments: [IComment] = res.locals.comments;

    const currentUserId = req.signedCookies["user"]._id;

    const commentsWithReactions = comments.map((comment) => {
        const currentReaction = getCurrentReaction(currentUserId, comment);
        return { ...comment, currentReaction };
    });

    return res.json({ comments: commentsWithReactions });
};

export { attachCurrentPostReaction, attachCurrentCommentReaction };
