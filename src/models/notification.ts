import { Schema, Types, model } from "mongoose";

interface INotification {
    user: Types.ObjectId;
    content: string;
    status: "new" | "seen";
    type: NotificationType;
    createdAt: Date;
    target?: Types.ObjectId;
}

enum NotificationType {
    friendRequest = "friendRequest",
    groupInvite = "groupInvite",
    postUpdate = "postUpdate",
    groupCreation = "groupCreation",
    memberRequest = "memberRequest",
}

const NotificationSchema = new Schema<INotification>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ["new", "seen"], default: "new" },
    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    target: { type: Schema.Types.ObjectId },
});

const Notification = model<INotification>("Notification", NotificationSchema);

export { Notification, INotification, NotificationType };
