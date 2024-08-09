import { Request, Response } from "express";

const getFriendships = async (req: Request, res: Response) => {
    res.send("Get friendships");
};

export default getFriendships;
