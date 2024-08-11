import { NextFunction, Request, Response } from "express";
import { Friendship } from "../../models/friendship";
import { NotFoundError } from "../../errors";

const deleteFriendship = async (req: Request, res: Response, next: NextFunction) => {
    const { senderID, receiverID } = req.body

    const friendship = await Friendship.deleteOne({
        sender: senderID,
        receiver: receiverID,
    })

    if (friendship.deletedCount === 0) {
        next(new NotFoundError("Friendship to delete not found!"));
    }

    res.json(friendship);
}

export default deleteFriendship

