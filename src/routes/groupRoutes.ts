import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import createGroup  from "../controllers/group/createGroup";
const groupRouter = Router();

groupRouter.post("/request", asyncWrapper(createGroup));

export default groupRouter;