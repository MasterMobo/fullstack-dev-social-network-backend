import { Router } from "express";

import { login, register } from "../controllers";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

// authRouter.post("/upload", uploadController.uploadFiles);

export default authRouter;
