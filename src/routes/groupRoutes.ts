import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import createGroup from "../controllers/group/createGroup";
import getUserAcceptedGroup from "../controllers/group/getUserAcceptedGroup";
import deleteGroupMember from "../controllers/group/deleteGroupMember";
import createMemberRequest from "../controllers/group/createMemberRequest";
import getMemberRequests from "../controllers/group/getMemberRequests";
import acceptMemberRequest from "../controllers/group/acceptMemberRequest";

const groupRouter = Router();

groupRouter.post("/request", asyncWrapper(createGroup));

groupRouter.get("/:userId/accepted", asyncWrapper(getUserAcceptedGroup));

groupRouter.delete("/:groupId/members", asyncWrapper(deleteGroupMember));

// Group member request
groupRouter.post("/:groupId/members", asyncWrapper(createMemberRequest));

// Get all group member requests
groupRouter.get("/:groupId/members/requests", asyncWrapper(getMemberRequests));

// Accept/decline group member request
groupRouter.get(
  "/:groupId/members/requests/:requestId",
  asyncWrapper(acceptMemberRequest)
);

export default groupRouter;
