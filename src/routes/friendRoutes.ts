import { Router } from "express";

import getFriends from "../controllers/friend/getFriends";
import getFriendships from "../controllers/friendship/getFriendships";

const friendRouter = Router();

friendRouter.get("/:userId", getFriends);

friendRouter.get("/request/:userId", getFriendships);

export default friendRouter;
