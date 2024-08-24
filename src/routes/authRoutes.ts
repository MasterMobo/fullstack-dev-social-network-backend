import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import { login, register, uploadImage } from "../controllers";
import { singleFileUpload } from "../middlewares/fileUpload";
import adminLogin from "../controllers/auth/adminLogin";

const authRouter = Router();

authRouter.post("/login", asyncWrapper(login));

authRouter.post("/register", singleFileUpload("file"), asyncWrapper(register));

authRouter.post("/upload", asyncWrapper(uploadImage));

authRouter.post("/admin/login", asyncWrapper(adminLogin));

export default authRouter;
