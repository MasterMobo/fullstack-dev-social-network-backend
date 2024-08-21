import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { BadRequestError } from "../../errors";
import { Types } from "mongoose";
import { User } from "../../models/user";
import { Friendship } from "../../models/friendship";

const getPostsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.params;
  const { _id: currentUserId } = req.signedCookies["user"];

  // If the userID is the current user, return all posts
  if (userID === currentUserId.toString()) {
    const posts = await Post.find({ userID }).exec();
    return res.json({ posts });
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
    const posts = await Post.find({ userID }).exec();
    return res.json({ posts });
  }

  // Otherwise, return only public posts
  const publicPosts = await Post.find({ userID, visibility: "public" }).exec();
  return res.json({ posts: publicPosts });
};

export default getPostsByUserId;
