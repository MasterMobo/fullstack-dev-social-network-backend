import { Router } from "express";
import { asyncWrapper } from "../middlewares";
import getImage from "../controllers/images/getImage";

const imageRouter = Router();

imageRouter.get("/:id", asyncWrapper(getImage));

export default imageRouter;
