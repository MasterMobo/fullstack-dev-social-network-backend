import { Request, Response, NextFunction } from "express";
import { IPost, Post } from "../../models/post";
import { BadRequestError } from "../../errors";
import { Types } from "mongoose";
import { User } from "../../models/user";
import { Friendship } from "../../models/friendship";
import getMyPosts from "./getMyPosts";

const getPostsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userID } = req.params;
    const { _id: currentUserId } = req.signedCookies["user"];

    // If the userID is the current user, return all posts
    if (userID === currentUserId.toString()) {
        return getMyPosts(req, res, next);
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
            .sort({ postedAt: -1 })
            .exec();

        // Pass the posts to the next middleware
        res.locals.posts = posts.map((post) => post.toObject());
        return next();
    }

    // Otherwise, return only public posts
    const posts = await Post.find({ user: userID, visibility: "public" })
        .populate("user")
        .populate("group")
        .sort({ postedAt: -1 })
        .exec();

    // Pass the posts to the next middleware
    res.locals.posts = posts.map((post) => post.toObject());
    return next();
};

export default getPostsByUserId;
