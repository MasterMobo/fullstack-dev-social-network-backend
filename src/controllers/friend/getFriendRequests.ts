import { Request, Response, NextFunction } from "express";
import { Friendship } from "../../models/friendship";
import { User } from "../../models/user";
const getFriends = async (req: Request, res: Response) => {

    const {userID} = req.body;
    const friendships = await Friendship.find({
        receiver: userID,
        status: "pending"
    });

    const friendIDs = friendships.map(friendship => friendship.sender);
     const requestList = await User.find({
            _id: { $in: friendIDs }
        });
    
        return res.json(requestList);
};

export default getFriends;
