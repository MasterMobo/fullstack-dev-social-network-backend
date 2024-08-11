import { Router } from "express";
import { asyncWrapper, authMiddleware } from "../middlewares";
import { acceptFriendRequest, createFriendRequest, deleteFriendship, getFriends, getFriendships } from "../controllers";

const friendRouter = Router();

friendRouter.get("/", getFriends);

friendRouter.get("/request", getFriendships);

friendRouter.post("/friends/rquest", authMiddleware, asyncWrapper(createFriendRequest))

friendRouter.patch("/friends/request", authMiddleware, asyncWrapper(acceptFriendRequest))

friendRouter.delete("/friends/request", authMiddleware, asyncWrapper(deleteFriendship))

export default friendRouter;
