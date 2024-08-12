import { NextFunction, Request, Response } from "express";
import { Friendship } from "../../models/friendship";
import { BadRequestError } from "../../errors";

const acceptFriendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { senderID, receiverID, status } = req.body;

    if (!status || status !== "accepted") {
        return next(new BadRequestError("Invalid request status"));
    }

    const friendship = await Friendship.findOne({
        sender: senderID,
        receiver: receiverID,
    });

    if (!friendship) {
        return next(new BadRequestError("Invalid sender or receiver"));
    }

    friendship.status = "accepted";

    await friendship!.save();

    return res.json({ request: friendship });
};

export default acceptFriendRequest;
