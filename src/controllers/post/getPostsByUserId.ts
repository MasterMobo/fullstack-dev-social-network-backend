import { Request, Response, NextFunction } from "express";
import { IPost, Post } from "../../models/post";
import { BadRequestError } from "../../errors";
import { Types } from "mongoose";
import { User } from "../../models/user";
import { Friendship } from "../../models/friendship";
import getCurrentPostReaction from "./helpers/getCurrentPostReaction";

const getPostsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userID } = req.params;
    const { _id: currentUserId } = req.signedCookies["user"];

    // If the userID is the current user, return all posts
    if (userID === currentUserId.toString()) {
        const posts = await Post.find({ user: userID })
            .populate("user")
            .populate("group")
            .exec();

        const responsePosts = posts.map((post) => {
            const currentReaction = getCurrentPostReaction(currentUserId, post);
            return { ...post.toObject(), currentReaction };
        });
        return res.json({ posts: responsePosts });
    }

    // Check if they are friends
    const friendship = await Friendship.findOne({
        $or: [
            { sender: currentUserId, receiver: userID },
            { sender: userID, receiver: currentUserId },
        ],
        status: "accepted",
    }).exec();

    // If they are friends, return all posts
    if (friendship) {
        const posts = await Post.find({ user: userID })
            .populate("user")
            .populate("group")
            .exec();

        const responsePosts = posts.map((post) => {
            const currentReaction = getCurrentPostReaction(currentUserId, post);
            return { ...post.toObject(), currentReaction };
        });

        return res.json({ posts: responsePosts });
    }

    // Otherwise, return only public posts
    const posts = await Post.find({ user: userID, visibility: "public" })
        .populate("user")
        .populate("group")
        .exec();

    const responsePosts = posts.map((post) => {
        const currentReaction = getCurrentPostReaction(currentUserId, post);
        return { ...post.toObject(), currentReaction };
    });

    return res.json({ posts: responsePosts });
};

export default getPostsByUserId;
