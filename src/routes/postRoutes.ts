import { Router } from "express";
import { manyFilesUpload } from "../middlewares/fileUpload";
import createPost from "../controllers/post/createPost";
import { asyncWrapper, authMiddleware } from "../middlewares";

import editPost from "../controllers/post/editPost";
import addPostReaction from "../controllers/post/addPostReaction";
import editPostReaction from "../controllers/post/editPostReaction";
import removePostReaction from "../controllers/post/removePostReaction";

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
export default postRouter;
