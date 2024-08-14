import { Request, Response, NextFunction } from "express";
import { Friendship } from "../../models/friendship";
import { User } from "../../models/user";

const getFriendships = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const friendships = await Friendship.find({
        receiver: userId,
        status: "pending",
    });

    const friendIDs = friendships.map((friendship) => friendship.sender);
    const requestList = await User.find({
        _id: { $in: friendIDs },
    });

    return res.json({ requests: requestList });
};

export default getFriendships;
