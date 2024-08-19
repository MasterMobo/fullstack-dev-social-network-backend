import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { Post } from "../../models/post";
import { User } from "../../models/user";

const getPostFeed = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    // Get the user's friends
    const user = await User.findById(userId).populate('friends').exec();
    if (!user) {
        return next(new BadRequestError("User not found."));
    }

    // Get public posts and posts from friends
    const posts = await Post.find({
        $or: [
            { visibility: "public" },
            { userID: { $in: user.friends } }
        ]
    })
    .sort({ postedAt: -1 }) // Sort by date, newest first
    .exec();

    res.json({ posts });
};

export default getPostFeed;