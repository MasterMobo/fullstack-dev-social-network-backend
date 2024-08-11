import { NextFunction, Request, Response } from "express";
import { Friendship } from "../../models/friendship";
import { BadRequestError } from "../../errors";

const acceptFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { senderID, receiverID } = req.body;

    const friendship = await Friendship.findOne({
        sender: senderID,
        receiver: receiverID,
    });

    if (!friendship) {
        return next(new BadRequestError("Invalid sender or receiver"));
    }

    friendship.status = "accepted";

    await friendship!.save();

    return res.json(friendship);
};

export default acceptFriendRequest
