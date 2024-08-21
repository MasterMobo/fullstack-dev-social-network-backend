import { Request, Response, NextFunction } from "express";
import {BadRequestError,NotFoundError, UnauthorizedError} from "../../errors";
import { IGroup, Group } from "../../models/group";
import { IUser, Admin } from "../../models/user";
const acceptGroupRequest = async(req:Request, res: Response, next: NextFunction)=>{
    const admin: IUser = req.signedCookies["user"];
    if( !await Admin.findById(admin._id)){
        return next(new UnauthorizedError("401: User not authorized!"));
    }
    const  {groupId} = req.params;
    const {status} = req.body;
    if (!status || status !== "accepted") {
        return next(new BadRequestError("Invalid request status"));
    }
    const group = await Group.findById(groupId);
    if(!group){
        return next(new NotFoundError("Group can't be found!"));
    }

    group.status = status;
    await group!.save();

    res.status(200).json(group);
}
export default acceptGroupRequest;