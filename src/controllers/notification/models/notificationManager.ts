import { Types } from "mongoose";
import { INotification, Notification } from "../../../models/notification";
import {
    FriendRequestAcceptedNotificationFactory,
    FriendRequestReceivedNotificationFactory,
} from "./friendRequestNotification";
import {
    CommentReceivedNotificationFactory,
    ReactionReceivedNotificationFactory,
} from "./postUpdateNotification";
import { GroupCreationAcceptedNotificationFactory } from "./groupCreationNotification";
import { GroupMemberRequestReceivedNotificationFactory } from "./groupMemberNotification";

class NotificationManager {
    // Singleton instance
    private static instance: NotificationManager;
    private constructor() {}

    public static getInstance(): NotificationManager {
        if (!NotificationManager.instance) {
            NotificationManager.instance = new NotificationManager();
        }
        return NotificationManager.instance;
    }

    public async sendNotification(notification: INotification | null) {
        if (!notification) {
            return;
        }

        await Notification.create(notification);
    }

    public async sendFriendRequestReceivedNotification(
        senderId: Types.ObjectId,
        receiverId: Types.ObjectId
    ) {
        const notification =
            await FriendRequestReceivedNotificationFactory.create(
                senderId,
                receiverId
            );

        this.sendNotification(notification);
    }

    public async sendFriendRequestAcceptedNotification(
        senderId: Types.ObjectId,
        receiverId: Types.ObjectId
    ) {
        const notification =
            await FriendRequestAcceptedNotificationFactory.create(
                senderId,
                receiverId
            );

        this.sendNotification(notification);
    }

    public async sendCommentReceivedNotification(
        postAuthorId: Types.ObjectId,
        postId: Types.ObjectId,
        commentAuthorId: Types.ObjectId
    ) {
        const notification = await CommentReceivedNotificationFactory.create(
            postAuthorId,
            postId,
            commentAuthorId
        );

        this.sendNotification(notification);
    }

    public async sendReactionReceivedNotification(
        postAuthorId: Types.ObjectId,
        postId: Types.ObjectId,
        reactionAuthorId: Types.ObjectId
    ) {
        const notification = await ReactionReceivedNotificationFactory.create(
            postAuthorId,
            postId,
            reactionAuthorId
        );

        this.sendNotification(notification);
    }

    public async sendGroupCreationAcceptedNotification(
        groupAdminId: Types.ObjectId,
        groupId: Types.ObjectId
    ) {
        const notification =
            await GroupCreationAcceptedNotificationFactory.create(
                groupAdminId,
                groupId
            );

        this.sendNotification(notification);
    }

    public async sendGroupMemberRequestReceivedNotification(
        groupAdminId: Types.ObjectId,
        requestedMemberId: Types.ObjectId,
        groupId: Types.ObjectId
    ) {
        const notification =
            await GroupMemberRequestReceivedNotificationFactory.create(
                groupAdminId,
                requestedMemberId,
                groupId
            );

        this.sendNotification(notification);
    }
}

export default NotificationManager;
