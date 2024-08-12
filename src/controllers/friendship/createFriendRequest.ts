import { NextFunction, Request, Response } from "express";
import { Friendship, IFriendship } from "../../models/friendship";
import { IUser, User } from "../../models/user";
import { BadRequestError, NotFoundError } from "../../errors";
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
        return next(new NotFoundError("Sender or Receiver can't be found!"));
    }

    if (senderID === receiverID) {
        return next(new BadRequestError("Sender and Receiver can't be the same!"));
    }

    const existingFriendship = await Friendship.findOne({
        $or: [
            { sender: senderID, receiver: receiverID },
            { sender: receiverID, receiver: senderID },
        ],
    });

    if (existingFriendship) {
        return next(new BadRequestError("Friendship already exists!"));
    }

    const newFriendship: IFriendship = {
        sender: senderID,
        receiver: receiverID,
        status: "pending",
    };

    await new Friendship(newFriendship).save();

    return res.json({ request: newFriendship });
};

export default createFriendRequest;
