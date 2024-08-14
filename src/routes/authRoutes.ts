import { Router } from "express";
import login from "../controllers/auth/login";
import register from "../controllers/auth/register";
import * as uploadController from "../controllers/auth/upload";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/upload", uploadController.uploadFiles);

export default authRouter;
