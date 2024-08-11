import { Router } from "express";
import getProfile from "../controllers/profile/getProfile";
const profileRouter = Router();

profileRouter.get("/:userId", getProfile);

export default profileRouter;
