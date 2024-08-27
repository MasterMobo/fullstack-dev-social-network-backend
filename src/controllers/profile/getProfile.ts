import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors";
import { IUser, User } from "../../models/user";
import { Friendship } from "../../models/friendship";
import getMe from "../user/getMe";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
        next(new NotFoundError("User not found"));
        return;
    }

    const currentUser: IUser = req.signedCookies["user"];

    // If the user is the current user
    if (user._id.equals(currentUser._id)) {
        return getMe(req, res, next);
    }

    let friendStatus = "none";

    // If current user is friends with the user
    const friendShip = await Friendship.findOne({
        $or: [
            { sender: currentUser._id, receiver: userId },
            { sender: userId, receiver: currentUser._id },
        ],
    }).exec();

    // If they are friends
    if (friendShip?.status === "accepted") {
        friendStatus = "friends";

        // If they have a pending friend request
    } else if (friendShip?.status === "pending") {
        // If the current user is the sender
        if (friendShip.sender.equals(currentUser._id)) {
            friendStatus = "requestSent";
        }

        // If the current user is the receiver
        else if (friendShip.receiver.equals(currentUser._id)) {
            friendStatus = "requestReceived";
        }
    }

    return res.json({ user: { ...user.toObject(), friendStatus } });
};

export default getProfile;
