import { Request, Response } from "express";

const getProfile = (req: Request, res: Response) => {
    res.send("Get profile");
};

export default getProfile;
