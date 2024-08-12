import { NextFunction, Request, Response } from "express";
import { Friendship } from "../../models/friendship";
import { BadRequestError } from "../../errors";

const deleteFriendship = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { senderID, receiverID } = req.body;

    const friendship = await Friendship.deleteOne({
        sender: senderID,
        receiver: receiverID,
    });

    if (friendship.deletedCount === 0) {
        return next(new BadRequestError("Invalid sender or receiver"));
    }

    return res.json({ request: friendship });
};

export default deleteFriendship;
