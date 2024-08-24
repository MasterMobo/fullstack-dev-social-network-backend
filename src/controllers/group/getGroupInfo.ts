import { Request, Response, NextFunction } from "express";
import { Group } from "../../models/group";
import { NotFoundError } from "../../errors";

const getGroupInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get group id from request
    const { groupId } = req.params;

    // Find group by id
    const group = await Group.findById(groupId);

    // If group not found, return error
    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    return res.json(group);
};

export default getGroupInfo;
