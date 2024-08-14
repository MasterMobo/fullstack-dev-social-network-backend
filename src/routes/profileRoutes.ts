import { Router } from "express";
import { getProfile } from "../controllers"; 
import { asyncWrapper } from "../middlewares";
const profileRouter = Router();

profileRouter.get("/:userId", asyncWrapper(getProfile));

export default profileRouter;
