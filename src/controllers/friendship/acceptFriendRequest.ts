import { NextFunction, Request, Response } from "express";
import { Friendship } from "../../models/friendship";
import { BadRequestError, ConflictError } from "../../errors";
import NotificationManager from "../notification/models/notificationManager";

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

    if (friendship.status === "accepted") {
        return next(new ConflictError("Friendship already accepted"));
    }

    friendship.status = "accepted";

    await friendship!.save();

    // Send notification to the sender
    await NotificationManager.getInstance().sendFriendRequestAcceptedNotification(
        senderID,
        receiverID
    );

    return res.json({ request: friendship });
};

export default acceptFriendRequest;
