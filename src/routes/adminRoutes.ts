import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import acceptGroupRequest from "../controllers/group/acceptGroupRequest";
import getAllGroupRequest from "../controllers/group/getAllGroupRequest";
import deleteGroupRequest from "../controllers/group/deleteGroupRequest";
const adminRouter = Router();

adminRouter.get("/home", asyncWrapper(getAllGroupRequest));

export default adminRouter;
