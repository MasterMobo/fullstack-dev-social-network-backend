import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { Notification } from "../../models/notification";

const updateNotificationStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { notificationId } = req.params;
    const { status } = req.body;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
        return next(new NotFoundError("Notification can't be found!"));
    }

    if (!status) {
        return next(new BadRequestError("Notification status is required"));
    }

    if (status !== "new" && status !== "seen") {
        return next(new BadRequestError("Invalid notification status"));
    }

    notification.status = status;
    await notification!.save();

    return res.json({ notification });
};

export default updateNotificationStatus;
