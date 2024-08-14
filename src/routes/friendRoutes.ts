import { Router } from "express";
import { asyncWrapper, authMiddleware } from "../middlewares";
import {
    acceptFriendRequest,
    createFriendRequest,
    deleteFriendship,
    getFriends,
    getFriendships,
} from "../controllers";

const friendRouter = Router();

friendRouter.get("/:userId", authMiddleware, getFriends);

friendRouter.get("/request/:userId", authMiddleware, getFriendships);

friendRouter.post(
    "/request",
    authMiddleware,
    asyncWrapper(createFriendRequest)
);

friendRouter.patch(
    "/request",
    authMiddleware,
    asyncWrapper(acceptFriendRequest)
);

friendRouter.delete("/request", authMiddleware, asyncWrapper(deleteFriendship));

export default friendRouter;
