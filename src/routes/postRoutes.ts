import { Router } from "express";
import { manyFilesUpload } from "../middlewares/fileUpload";
import createPost from "../controllers/post/createPost";
import { asyncWrapper, authMiddleware } from "../middlewares";

import editPost from "../controllers/post/editPost";
import addPostReaction from "../controllers/post/addPostReaction";
import editPostReaction from "../controllers/post/editPostReaction";
import removePostReaction from "../controllers/post/removePostReaction";
import getComment from "../controllers/post/getComment";
import getPostById from "../controllers/post/getPostById";
import getPostsByUserId from "../controllers/post/getPostsByUserId";
import getPostFeed from "../controllers/post/getPostFeed";
import getMyPosts from "../controllers/post/getMyPost";

import createComment from "../controllers/comment/createComment";
import editComment from "../controllers/comment/editComment";
import addCommentReaction from "../controllers/comment/addCommentReaction";
import editCommentReaction from "../controllers/comment/editCommentReaction";
import removeCommentReaction from "../controllers/comment/removeCommentReaction";
const postRouter = Router();

postRouter.post(
    "/",
    authMiddleware,
    manyFilesUpload("images"),
    asyncWrapper(createPost)
);
postRouter.patch("/:postId", authMiddleware, asyncWrapper(editPost));

postRouter.post(
    "/:postId/reaction",
    authMiddleware,
    asyncWrapper(addPostReaction)
);

postRouter.patch(
    "/:postId/reaction",
    authMiddleware,
    asyncWrapper(editPostReaction)
);

postRouter.delete(
    "/:postId/reaction",
    authMiddleware,
    asyncWrapper(removePostReaction)
);

postRouter.post(
    "/:postId/comment",
    authMiddleware,
    asyncWrapper(createComment)
)

postRouter.patch(
    "/:postId/comment/:commentId",
    authMiddleware,
    asyncWrapper(editComment)
)
postRouter.post(
    "/:postId/comment/:commentId/reaction",
    authMiddleware,
    asyncWrapper(addCommentReaction)
)
postRouter.patch(
    "/:postId/comment/:commentId/reaction",
    asyncWrapper(editCommentReaction)
)
postRouter.delete(
    "/:postId/comment/:commentId/reaction",
    asyncWrapper(removeCommentReaction)
)

postRouter.get(
    "/:postId/comment", 
    authMiddleware, 
    asyncWrapper(getComment)
)

postRouter.get(
    "/posts/:postId/comment",
    authMiddleware,
    asyncWrapper(getComment)
);

postRouter.get("/:postID", authMiddleware, asyncWrapper(getPostById));

postRouter.get("/user/:userID", authMiddleware, asyncWrapper(getPostsByUserId));

postRouter.get("/posts/me", authMiddleware, asyncWrapper(getMyPosts));

postRouter.get("/feed/:userId", authMiddleware, asyncWrapper(getPostFeed));

export default postRouter;
