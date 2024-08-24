import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import createGroup from "../controllers/group/createGroup";
import getUserAcceptedGroup from "../controllers/group/getUserAcceptedGroup";
import deleteGroupMember from "../controllers/group/deleteGroupMember";
import { manyFilesUpload, singleFileUpload } from "../middlewares/fileUpload";
import getGroupInfo from "../controllers/group/getGroupInfo";
import getGroupPosts from "../controllers/group/getGroupPosts";
import removeGroupPost from "../controllers/group/removeGroupPost";
import removeGroupComment from "../controllers/group/removeGroupComment";

const groupRouter = Router();

groupRouter.post(
    "/request",
    singleFileUpload("groupPicture"),
    asyncWrapper(createGroup)
);

groupRouter.get("/:userId/accepted", asyncWrapper(getUserAcceptedGroup));

groupRouter.get("/:groupId", asyncWrapper(getGroupInfo));

groupRouter.get("/:groupId/posts", asyncWrapper(getGroupPosts));

groupRouter.delete("/:groupId/posts/:postId", asyncWrapper(removeGroupPost));

groupRouter.delete(
    "/:groupId/posts/:postId/comments/:commentId",
    asyncWrapper(removeGroupComment)
);

groupRouter.delete(
    "/:groupId/members/:memberId",
    asyncWrapper(deleteGroupMember)
);

export default groupRouter;
