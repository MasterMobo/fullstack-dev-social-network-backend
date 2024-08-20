import { NextFunction, Request, Response } from "express";
import {BadRequestError,NotFoundError,} from "../../errors";
import { IUser, User } from "../../models/user";
import { IGroup, Group } from "../../models/group";

const createGroup = async (req:Request, res:Response, next: NextFunction)=>{
    const {name, groupPicture, userID, visibility} = req.body;
    const admin: IUser| null = await User.findById(userID);

    if(!admin){
        return next(new NotFoundError("User can't be found!"));
    }

    if(!name){
        return next(new BadRequestError("Group must have name"));
    }
    if(!groupPicture){
        return next(new BadRequestError("Group must have picture"));
    }

    if(!visibility){
        return next(new BadRequestError("Group must public or private"));
    }
    const newGroup: IGroup = {
        name:name,
        groupPicture: groupPicture,
        visibility: visibility,
        members: [admin],
        admins: [admin],
        status: "pending"
    }
    const group = await Group.create(newGroup);
    return res.status(200).json(group);
};
export default createGroup;