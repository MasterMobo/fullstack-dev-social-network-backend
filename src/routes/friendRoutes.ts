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

friendRouter.get("/:userId", asyncWrapper(getFriends));

friendRouter.get("/request/:userId", asyncWrapper(getFriendships));

friendRouter.post("/request", asyncWrapper(createFriendRequest));

friendRouter.patch("/request", asyncWrapper(acceptFriendRequest));

friendRouter.delete("/request", asyncWrapper(deleteFriendship));

export default friendRouter;
