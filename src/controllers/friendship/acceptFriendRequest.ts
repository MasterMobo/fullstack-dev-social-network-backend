import { NextFunction, Request, Response } from "express";
import { Friendship } from "../../models/friendship";
import { NotFoundError } from "../../errors";

const acceptFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { senderID, receiverID, status = "accepted" } = req.body;

    const friendship = await Friendship.findOne({
        sender: senderID,
        receiver: receiverID,
        status: "pending",
    });

    if (!friendship) {
        next(new NotFoundError("Friendship request not found!"));
    }

    friendship!.status = status;

    await friendship!.save();

    res.json(friendship);
};

export default acceptFriendRequest
