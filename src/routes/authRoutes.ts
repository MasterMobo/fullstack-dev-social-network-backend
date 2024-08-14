import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import { login, register, uploadImage } from "../controllers";
import { singleFileUpload } from "../middlewares/fileUpload";
const authRouter = Router();

authRouter.post("/login", asyncWrapper(login));

authRouter.post("/register", singleFileUpload, asyncWrapper(register));

authRouter.post("/upload", asyncWrapper(uploadImage));

export default authRouter;
