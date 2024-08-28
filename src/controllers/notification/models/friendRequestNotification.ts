import { Types } from "mongoose";
import UserNotification from "./userNotification";
import { NotificationType } from "../../../models/notification";
import { User } from "../../../models/user";

class FriendRequestAcceptedNotificationFactory {
    static async create(senderId: Types.ObjectId, receiverId: Types.ObjectId) {
        const receiver = await User.findById(receiverId).exec();
        if (!receiver) {
            console.log("User not found");
            return null;
        }

        return new UserNotification(
            senderId,
            `${receiver.fullName} has accepted your friend request`,
            NotificationType.friendRequest,
            senderId
        );
    }
}

class FriendRequestReceivedNotificationFactory {
    static async create(senderId: Types.ObjectId, receiverId: Types.ObjectId) {
        const sender = await User.findById(senderId).exec();
        if (!sender) {
            console.log("User not found");
            return null;
        }

        return new UserNotification(
            receiverId,
            `${sender.fullName} has sent you a friend request`,
            NotificationType.friendRequest,
            receiverId
        );
    }
}

export {
    FriendRequestAcceptedNotificationFactory,
    FriendRequestReceivedNotificationFactory,
};
