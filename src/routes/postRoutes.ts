import { Router, Request, Response } from "express";
import { manyFilesUpload } from "../middlewares/fileUpload";
import createPost from "../controllers/post/createPost";
import { asyncWrapper, authMiddleware } from "../middlewares";

const postRouter = Router();

postRouter.post(
    "/",
    authMiddleware,
    manyFilesUpload("images"),
    asyncWrapper(createPost)
);
postRouter.patch("/:postId", authMiddleware);

export default postRouter;
