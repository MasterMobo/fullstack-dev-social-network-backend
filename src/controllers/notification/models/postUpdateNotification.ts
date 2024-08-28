import { Types } from "mongoose";
import { User } from "../../../models/user";
import { NotificationType } from "../../../models/notification";
import UserNotification from "./userNotification";

class CommentReceivedNotificationFactory {
    static async create(
        postAuthorId: Types.ObjectId,
        postId: Types.ObjectId,
        commentAuthorId: Types.ObjectId
    ) {
        const commentAuthor = await User.findById(commentAuthorId).exec();

        if (!commentAuthor) {
            console.log("User not found");
            return null;
        }

        return new UserNotification(
            postAuthorId,
            `${commentAuthor.fullName} has commented on your post`,
            NotificationType.postUpdate,
            postId
        );
    }
}

class ReactionReceivedNotificationFactory {
    static async create(
        postAuthorId: Types.ObjectId,
        postId: Types.ObjectId,
        reactionAuthorId: Types.ObjectId
    ) {
        const reactionAuthor = await User.findById(reactionAuthorId).exec();

        if (!reactionAuthor) {
            console.log("User not found");
            return null;
        }

        return new UserNotification(
            postAuthorId,
            `${reactionAuthor.fullName} has reacted to your post`,
            NotificationType.postUpdate,
            postId
        );
    }
}

export {
    CommentReceivedNotificationFactory,
    ReactionReceivedNotificationFactory,
};
