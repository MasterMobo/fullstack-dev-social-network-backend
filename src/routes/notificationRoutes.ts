import { Router } from "express";
import getUserNotifications from "../controllers/notification/getUserNotifications";
import { asyncWrapper } from "../middlewares";
import updateNotificationStatus from "../controllers/notification/updateNotificationStatus";

const notificationRouter = Router();

notificationRouter.patch(
    "/:notificationId",
    asyncWrapper(updateNotificationStatus)
);

notificationRouter.get("/user/:userId", asyncWrapper(getUserNotifications));

export default notificationRouter;
