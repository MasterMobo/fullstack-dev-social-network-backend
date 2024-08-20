import { Request, Response, NextFunction } from "express";
import {BadRequestError,NotFoundError,} from "../../errors";
import { IGroup, Group } from "../../models/group";

const acceptGroupRequest = async(req:Request, res: Response, next: NextFunction)=>{
    const {groupId,status} = req.body;
    
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