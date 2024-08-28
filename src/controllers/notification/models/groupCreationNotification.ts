import { Types } from "mongoose";
import { Group } from "../../../models/group";
import UserNotification from "./userNotification";
import { NotificationType } from "../../../models/notification";

class GroupCreationAcceptedNotificationFactory {
    static async create(groupAdminId: Types.ObjectId, groupId: Types.ObjectId) {
        const group = await Group.findById(groupId).exec();

        if (!group) {
            console.log("Group not found");
            return null;
        }

        return new UserNotification(
            groupAdminId,
            `Your request to create the group ${group.name} has been accepted`,
            NotificationType.groupCreation,
            groupId
        );
    }
}

export { GroupCreationAcceptedNotificationFactory };
