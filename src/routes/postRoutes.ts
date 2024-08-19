import { Router } from "express";
import { manyFilesUpload } from "../middlewares/fileUpload";
import createPost from "../controllers/post/createPost";
import { asyncWrapper, authMiddleware } from "../middlewares";

import editPost from "../controllers/post/editPost";
import addPostReaction from "../controllers/post/addPostReaction";
import editPostReaction from "../controllers/post/editPostReaction";
import removePostReaction from "../controllers/post/removePostReaction";
import getComment from "../controllers/post/getComment";

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

postRouter.get(
    "/:postId/comment", 
    authMiddleware, 
    asyncWrapper(getComment)
)

export default postRouter;
