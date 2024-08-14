import { Router } from "express";
import { getMe } from "../controllers";
import { asyncWrapper, authMiddleware } from "../middlewares";

const userRouter = Router();

userRouter.get("/", authMiddleware, asyncWrapper(getMe));

export default userRouter;
