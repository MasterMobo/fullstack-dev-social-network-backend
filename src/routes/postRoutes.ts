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

postRouter.get(
    "/posts/:postId/comment",
    authMiddleware,
    asyncWrapper(getComment)
);

postRouter.get("/:postID", authMiddleware, asyncWrapper(getPostById));

postRouter.get("/user/:userID", authMiddleware, asyncWrapper(getPostsByUserId));

postRouter.get("/posts/me", authMiddleware, asyncWrapper(getMyPosts));

postRouter.get("/feed/:userId", getPostFeed);

export default postRouter;
