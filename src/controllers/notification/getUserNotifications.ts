import { Request, Response } from "express";
import { Notification } from "../../models/notification";

const getUserNotifications = async (req: Request, res: Response) => {
    const { userId } = req.params;

    // Find user notifications
    const notifications = await Notification.find({ user: userId }).sort({
        createdAt: -1, // newest first
    });

    return res.json({ notifications });
};

export default getUserNotifications;
