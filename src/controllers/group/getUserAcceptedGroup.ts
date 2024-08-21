import { Request, Response, NextFunction } from "express";
import {BadRequestError,NotFoundError, UnauthorizedError} from "../../errors";
import { IGroup, Group } from "../../models/group";
import { IUser, User } from "../../models/user";

const getUserAcceptedGroup = async (req: Request, res: Response, next: NextFunction)=>{
    const {userId} = req.params;
    if(!userId){
        return next(new BadRequestError("Must provide userId"));

    }
    const user: IUser| null = await User.findById(userId);

    if(!user){
        return next(new NotFoundError("User can't be found!"));
    }
    const groups = await Group.find({
        members: { $elemMatch: { _id: user._id } },
        status: "accepted"
    });
    res.status(200).json(groups);
}

export default getUserAcceptedGroup;