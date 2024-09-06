import { Types } from "mongoose";
import { INotification, NotificationType } from "../../../models/notification";

class UserNotification implements INotification {
    user: Types.ObjectId;
    content: string;
    status: "new" | "seen";
    type: NotificationType;
    createdAt: Date;
    target?: Types.ObjectId | undefined;

    constructor(
        user: Types.ObjectId,
        content: string,
        type: NotificationType,
        target?: Types.ObjectId
    ) {
        this.user = user;
        this.content = content;
        this.status = "new";
        this.type = type;
        this.createdAt = new Date();
        this.target = target;
    }
}

export default UserNotification;
