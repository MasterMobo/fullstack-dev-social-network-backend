import { Router } from "express";
import { asyncWrapper, authMiddleware } from "../middlewares";
import { createFriendRequest, getFriends, getFriendships } from "../controllers";

const friendRouter = Router();

friendRouter.get("/", getFriends);

friendRouter.get("/request", getFriendships);

friendRouter.post("/friends/rquest", authMiddleware, asyncWrapper(createFriendRequest))

export default friendRouter;
