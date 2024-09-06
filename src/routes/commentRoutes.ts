import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import getPostComments from "../controllers/comment/getPostComments";
import { attachCurrentCommentReaction } from "../middlewares/reactions/attachCurrentReaction";
import getCommentById from "../controllers/comment/getCommentById";
import createComment from "../controllers/comment/createComment";
import editComment from "../controllers/comment/editComment";
import addCommentReaction from "../controllers/comment/addCommentReaction";
import editCommentReaction from "../controllers/comment/editCommentReaction";
import removeCommentReaction from "../controllers/comment/removeCommentReaction";

const commentRouter = Router({ mergeParams: true });

commentRouter.post("/", asyncWrapper(createComment));

commentRouter.get(
    "/",
    asyncWrapper(getPostComments),
    attachCurrentCommentReaction
);

commentRouter.get("/:commentId", asyncWrapper(getCommentById));

commentRouter.patch("/:commentId", asyncWrapper(editComment));

commentRouter.post("/:commentId/reaction", asyncWrapper(addCommentReaction));

commentRouter.patch("/:commentId/reaction", asyncWrapper(editCommentReaction));

commentRouter.delete(
    "/:commentId/reaction",
    asyncWrapper(removeCommentReaction)
);

export default commentRouter;
