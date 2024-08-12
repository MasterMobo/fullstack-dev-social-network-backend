import { NextFunction, Request, Response } from "express";
import { Friendship, IFriendship } from "../../models/friendship";
import { IUser, User } from "../../models/user";
import { NotFoundError } from "../../errors";
import { Types } from "mongoose";

const createFriendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { senderID, receiverID } = req.body;

    const sender: IUser | null = await User.findById(senderID);
    const receiver: IUser | null = await User.findById(receiverID);

    if (!sender || !receiver) {
        next(new NotFoundError("Sender or Receiver can't be found!"));
    }

    const newFriendship: IFriendship = {
        sender: senderID,
        receiver: receiverID,
        status: "pending",
    };

    await new Friendship(newFriendship).save();

    return res.json(newFriendship);
};

export default createFriendRequest;
