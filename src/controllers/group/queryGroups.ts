import { Request, Response } from "express";
import { Group } from "../../models/group";

const queryGroups = async (req: Request, res: Response) => {
    const name = req.query.name || "";

    // Find groups by name (regex)
    const groups = await Group.find({
        name: { $regex: name, $options: "i" },
        status: "accepted",
        visibility: "public",
    });

    return res.json({ groups });
};

export default queryGroups;
