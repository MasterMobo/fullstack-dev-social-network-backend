import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import acceptGroupRequest from "../controllers/group/acceptGroupRequest";
import getAllGroupRequest from "../controllers/group/getAllGroupRequest";
import deleteGroupRequest from "../controllers/group/deleteGroupRequest";
const adminRouter = Router();

adminRouter.get("/groups/request", asyncWrapper(getAllGroupRequest));
adminRouter.patch("/groups/request/:groupId", asyncWrapper(acceptGroupRequest));
adminRouter.delete("/groups/request/:groupId", asyncWrapper(deleteGroupRequest));
export default adminRouter;
