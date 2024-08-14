import { Router } from "express";
import { getMe } from "../controllers";
import { asyncWrapper } from "../middlewares";

const userRouter = Router();

userRouter.get("/", asyncWrapper(getMe));

export default userRouter;
