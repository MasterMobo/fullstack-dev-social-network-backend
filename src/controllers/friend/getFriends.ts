import { Request, Response, NextFunction } from "express";
import { Friendship } from "../../models/friendship";
import { User } from "../../models/user";

const getFriends = async (req: Request, res: Response) => {

    const {userId} = req.params;
    const friendships = await Friendship.find({
        $or: [
            { sender: userId },
            { receiver: userId }
        ],
        status: "accepted"
    });

    const friendIDs = friendships.map(friendship =>
        friendship.sender.toString() === userId
            ? friendship.receiver
            : friendship.sender
    );
    
     const friendList = await User.find({
            _id: { $in: friendIDs }
        });
    
        return res.json(friendList);
};

export default getFriends;
