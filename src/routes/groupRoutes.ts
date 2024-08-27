import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import createGroup from "../controllers/group/groupCreationRequest/createGroup";
import getUserAcceptedGroup from "../controllers/group/getUserAcceptedGroup";
import deleteGroupMember from "../controllers/group/deleteGroupMember";
import { singleFileUpload } from "../middlewares/fileUpload";
import getGroupInfo from "../controllers/group/getGroupInfo";
import getGroupPosts from "../controllers/group/getGroupPosts";
import removeGroupPost from "../controllers/group/removeGroupPost";
import removeGroupComment from "../controllers/group/removeGroupComment";
import { attachCurrentPostReaction } from "../middlewares/reactions/attachCurrentReaction";
import getMemberRequests from "../controllers/group/memberRequest/getMemberRequests";
import acceptMemberRequest from "../controllers/group/memberRequest/acceptMemberRequest";
import createMemberRequest from "../controllers/group/memberRequest/createMemberRequest";

const groupRouter = Router();

groupRouter.post(
    "/request",
    singleFileUpload("groupPicture"),
    asyncWrapper(createGroup)
);

groupRouter.get("/:userId/accepted", asyncWrapper(getUserAcceptedGroup));

groupRouter.get("/:groupId", asyncWrapper(getGroupInfo));

groupRouter.get(
    "/:groupId/posts",
    asyncWrapper(getGroupPosts),
    attachCurrentPostReaction
);

groupRouter.delete("/:groupId/posts/:postId", asyncWrapper(removeGroupPost));

groupRouter.delete(
    "/:groupId/posts/:postId/comments/:commentId",
    asyncWrapper(removeGroupComment)
);

groupRouter.delete(
    "/:groupId/members/:memberId",
    asyncWrapper(deleteGroupMember)
);

groupRouter.post("/:groupId/members", asyncWrapper(createMemberRequest));

groupRouter.get("/:groupId/members/requests", asyncWrapper(getMemberRequests));

groupRouter.patch(
    "/:groupId/members/requests/:requestId",
    asyncWrapper(acceptMemberRequest)
);

export default groupRouter;
