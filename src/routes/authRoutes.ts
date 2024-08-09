import { Router, Request, Response } from "express";

const authRouter = Router();

authRouter.get("/login", (req: Request, res: Response) => {
    res.send("Login");
});

authRouter.get("/register", (req: Request, res: Response) => {
    res.send("Register");
});

export default authRouter;
