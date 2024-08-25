import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { Friendship } from "../../models/friendship";
import { BadRequestError, NotFoundError } from "../../errors";
import getCurrentPostReaction from "./helpers/getCurrentPostReaction";

const getPostFeed = async (req: Request, res: Response, next: NextFunction) => {
    const { _id: currentUserId } = req.signedCookies["user"];

    // Get the friends' IDs
    const friendships = await Friendship.find({
        $or: [{ sender: currentUserId }, { receiver: currentUserId }],
        status: "accepted",
    });

    const friendIDs = friendships.map((friendship) =>
        friendship.sender.toString() === currentUserId.toString()
            ? friendship.receiver
            : friendship.sender
    );

    // Include the current user's ID in the list of friendIDs
    friendIDs.push(currentUserId);

    // Get posts from the current user and their friends, and public posts
    const posts = await Post.find({
        $or: [{ user: { $in: friendIDs } }, { visibility: "public" }],
    })
        .populate("user")
        .populate("group")
        .sort({ postedAt: -1 }) // Sort by date, newest first
        .exec();

    // Add the current user's reaction to each post
    const responsePosts = posts.map((post) => {
        const currentReaction = getCurrentPostReaction(currentUserId, post);
        return { ...post.toObject(), currentReaction };
    });

    res.json({ posts: responsePosts });
};

export default getPostFeed;
