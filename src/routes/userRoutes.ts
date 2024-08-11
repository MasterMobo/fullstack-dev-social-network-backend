import { Router } from "express";
import getMe from "../controllers/user/getMe";
import asyncWrapper from "../middlewares/asyncWrapper";

const userRouter = Router();

userRouter.get("/", asyncWrapper(getMe));

export default userRouter;
