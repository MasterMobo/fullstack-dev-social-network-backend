import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import acceptGroupRequest from "../controllers/group/groupCreationRequest/acceptGroupRequest";
import getAllGroupRequest from "../controllers/group/groupCreationRequest/getAllGroupRequest";
import deleteGroupRequest from "../controllers/group/groupCreationRequest/deleteGroupRequest";
import getAllUsers from "../controllers/siteAdmin/getAllUsers";
import getAllPosts from "../controllers/siteAdmin/getAllPosts";
import suspendUser from "../controllers/siteAdmin/suspendUser";
import resumeUser from "../controllers/siteAdmin/resumeUser";
import removeComment from "../controllers/siteAdmin/removeComment";
import removePost from "../controllers/siteAdmin/removePost";
const adminRouter = Router();

adminRouter.get("/groups/request", asyncWrapper(getAllGroupRequest));
adminRouter.patch("/groups/request/:groupId", asyncWrapper(acceptGroupRequest));
adminRouter.delete(
  "/groups/request/:groupId",
  asyncWrapper(deleteGroupRequest)
);

// Get all users in the system
adminRouter.get("/users", asyncWrapper(getAllUsers));

// Get all posts in the system
adminRouter.get("/posts", asyncWrapper(getAllPosts));

// Suspend a user
adminRouter.patch("/users/suspend/:userId", asyncWrapper(suspendUser));

// Resume a user
adminRouter.patch("/users/resume/:userId", asyncWrapper(resumeUser));

// Remove comment
adminRouter.delete("comments/:commentId", asyncWrapper(removeComment));

// Remove post
adminRouter.delete("posts/:postId", asyncWrapper(removePost));

export default adminRouter;
