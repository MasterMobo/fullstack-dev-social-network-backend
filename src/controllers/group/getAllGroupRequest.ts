import { Request, Response, NextFunction } from "express";
import {BadRequestError,NotFoundError,} from "../../errors";
import { IGroup, Group } from "../../models/group";

const getAllGroupRequest = async (req: Request, res: Response) =>{
    const groups = await Group.find();
    res.status(200).json(groups);
}