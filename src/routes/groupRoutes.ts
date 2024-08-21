import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import createGroup  from "../controllers/group/createGroup";
import getUserAcceptedGroup from "../controllers/group/getUserAcceptedGroup";
import deleteGroupMember from "../controllers/group/deleteGroupMember";

const groupRouter = Router();

groupRouter.post("/request", asyncWrapper(createGroup));

groupRouter.get("/:userId/accepted", asyncWrapper(getUserAcceptedGroup));

groupRouter.patch("/:groupId/members", asyncWrapper(deleteGroupMember));

export default groupRouter;