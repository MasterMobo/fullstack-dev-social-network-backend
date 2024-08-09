import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
    res.send("Login");
};

export default login;