import { Request, Response } from "express";

const getFriends = async (req: Request, res: Response) => {
    res.send("Get friends");
};

export default getFriends;
