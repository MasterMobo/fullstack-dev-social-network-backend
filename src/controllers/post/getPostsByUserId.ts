import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError } from "../../errors";
import { Types } from "mongoose";
import { User } from "../../models/user";

const getPostsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { _id: currentUserId } = req.signedCookies["user"];

    // If the userID is the current user, return all posts
    if (userID === currentUserId.toString()) {
        const posts = await Post.find({ userID }).exec();
        return res.status(200).json({ posts });
    }

    // Find the current user to check their friends list
    const currentUser = await User.findById(currentUserId).exec();

    if (!currentUser) {
        return next(new BadRequestError("Current user not found."));
    }

    // If the userID is a friend, return all posts
    if (currentUser.friends.some(friendId => friendId.equals(new Types.ObjectId(userID)))) {
        const posts = await Post.find({ userID }).exec();
        return res.status(200).json({ posts });
    }

    // Otherwise, return only public posts
    const publicPosts = await Post.find({ userID, visibility: "public" }).exec();
    return res.status(200).json({ posts: publicPosts });
};

export default getPostsByUserId;
