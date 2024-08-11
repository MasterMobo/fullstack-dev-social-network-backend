import { Router } from "express";

import getFriends from "../controllers/friend/getFriends";
import getFriendships from "../controllers/friendship/getFriendships";

const friendRouter = Router();

friendRouter.get("/", getFriends);

friendRouter.get("/request", getFriendships);

export default friendRouter;
