import { Router } from "express";
import { manyFilesUpload } from "../middlewares/fileUpload";
import createPost from "../controllers/post/createPost";
import { asyncWrapper } from "../middlewares";

import editPost from "../controllers/post/editPost";
import addPostReaction from "../controllers/post/addPostReaction";
import editPostReaction from "../controllers/post/editPostReaction";
import removePostReaction from "../controllers/post/removePostReaction";
import getPostById from "../controllers/post/getPostById";
import getPostsByUserId from "../controllers/post/getPostsByUserId";
import getPostFeed from "../controllers/post/getPostFeed";
import getMyPosts from "../controllers/post/getMyPosts";
import { attachCurrentPostReaction } from "../middlewares/reactions/attachCurrentReaction";
import commentRouter from "./commentRoutes";

const postRouter = Router();

// User posts
postRouter.get(
    "/user/:userID",
    asyncWrapper(getPostsByUserId),
    attachCurrentPostReaction
);

postRouter.get("/me", asyncWrapper(getMyPosts), attachCurrentPostReaction);

postRouter.get(
    "/feed/:userId",
    asyncWrapper(getPostFeed),
    attachCurrentPostReaction
);

postRouter.post("/", manyFilesUpload("images"), asyncWrapper(createPost));

postRouter.get("/:postID", asyncWrapper(getPostById));

postRouter.patch("/:postId", asyncWrapper(editPost));

postRouter.post("/:postId/reaction", asyncWrapper(addPostReaction));

postRouter.patch("/:postId/reaction", asyncWrapper(editPostReaction));

postRouter.delete("/:postId/reaction", asyncWrapper(removePostReaction));

postRouter.use("/:postId/comment", commentRouter);

export default postRouter;
