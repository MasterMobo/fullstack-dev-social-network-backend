import { Request, Response, NextFunction } from "express";
import {BadRequestError,NotFoundError,} from "../../errors";
import { IGroup, Group } from "../../models/group";

const deleteGroupRequest = async (req:Request, res:Response, next:NextFunction)=> {
    const {groupId} = req.body;
    if(!groupId){
        return next(new BadRequestError("Invalid groupId "));
    }
    const group = await Group.findByIdAndDelete(groupId);
    
    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    res.status(200).json({ message: "Group deleted successfully" });
}

export default deleteGroupRequest;