import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import createGroup from "../controllers/group/createGroup";
import getUserAcceptedGroup from "../controllers/group/getUserAcceptedGroup";
import deleteGroupMember from "../controllers/group/deleteGroupMember";
import { manyFilesUpload, singleFileUpload } from "../middlewares/fileUpload";

const groupRouter = Router();

groupRouter.post(
    "/request",
    singleFileUpload("groupPicture"),
    asyncWrapper(createGroup)
);

groupRouter.get("/:userId/accepted", asyncWrapper(getUserAcceptedGroup));

groupRouter.delete(
    "/:groupId/members/:memberId",
    asyncWrapper(deleteGroupMember)
);

export default groupRouter;
