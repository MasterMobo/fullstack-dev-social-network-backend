import { Router } from "express";
import getMe from "../controllers/user/getMe";

const userRouter = Router();

userRouter.get("/", getMe);

export default userRouter;
