import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../../../errors";
import { IUser, User } from "../../../models/user";
import { IGroup, Group } from "../../../models/group";
import uploadImage from "../../upload/uploadImage";

const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, userId, visibility } = req.body;
    if (!userId) {
        return next(new BadRequestError("Must provide userId"));
    }
    const groupAdmin: IUser | null = await User.findById(userId);

    if (!groupAdmin) {
        return next(new NotFoundError("User can't be found!"));
    }

    if (!name) {
        return next(new BadRequestError("Group must have name"));
    }

    if (!visibility) {
        return next(new BadRequestError("Group must public or private"));
    }

    // Upload profile picture
    const groupPicture = await uploadImage(req, res, next);

    if (!groupPicture) {
        // uploadImage will handle the error, so we just return here
        return;
    }

    const newGroup: IGroup = {
        name: name,
        groupPicture: groupPicture,
        visibility: visibility,
        members: [groupAdmin],
        admins: [groupAdmin],
        status: "pending",
    };

    const group = await Group.create(newGroup);

    return res.status(200).json(group);
};
export default createGroup;
