import { Router } from "express";
import { manyFilesUpload } from "../middlewares/fileUpload";
import createPost from "../controllers/post/createPost";
import { asyncWrapper } from "../middlewares";

import editPost from "../controllers/post/editPost";
import addPostReaction from "../controllers/post/addPostReaction";
import editPostReaction from "../controllers/post/editPostReaction";
import removePostReaction from "../controllers/post/removePostReaction";
import getPostComments from "../controllers/comment/getPostComments";
import getPostById from "../controllers/post/getPostById";
import getPostsByUserId from "../controllers/post/getPostsByUserId";
import getPostFeed from "../controllers/post/getPostFeed";
import getMyPosts from "../controllers/post/getMyPosts";

import createComment from "../controllers/comment/createComment";
import editComment from "../controllers/comment/editComment";
import addCommentReaction from "../controllers/comment/addCommentReaction";
import editCommentReaction from "../controllers/comment/editCommentReaction";
import removeCommentReaction from "../controllers/comment/removeCommentReaction";
import getCommentById from "../controllers/comment/getCommentById";
import {
    attachCurrentCommentReaction,
    attachCurrentPostReaction,
} from "../middlewares/reactions/attachCurrentReaction";

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

// Posts
postRouter.post("/", manyFilesUpload("images"), asyncWrapper(createPost));

postRouter.get("/:postID", asyncWrapper(getPostById));

postRouter.patch("/:postId", asyncWrapper(editPost));

postRouter.post("/:postId/reaction", asyncWrapper(addPostReaction));

postRouter.patch("/:postId/reaction", asyncWrapper(editPostReaction));

postRouter.delete("/:postId/reaction", asyncWrapper(removePostReaction));

// Comments
postRouter.post("/:postId/comment", asyncWrapper(createComment));

postRouter.get(
    "/:postId/comment",
    asyncWrapper(getPostComments),
    attachCurrentCommentReaction
);

postRouter.get("/:postId/comment/:commentId", asyncWrapper(getCommentById));

postRouter.patch("/:postId/comment/:commentId", asyncWrapper(editComment));

postRouter.post(
    "/:postId/comment/:commentId/reaction",
    asyncWrapper(addCommentReaction)
);

postRouter.patch(
    "/:postId/comment/:commentId/reaction",
    asyncWrapper(editCommentReaction)
);

postRouter.delete(
    "/:postId/comment/:commentId/reaction",
    asyncWrapper(removeCommentReaction)
);

export default postRouter;
