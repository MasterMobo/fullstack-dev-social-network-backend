import { Request, Response } from "express";

const getMe = (req: Request, res: Response) => {
    res.send("Get me");
};

export default getMe;
