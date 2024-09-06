import { Types } from "mongoose";
import { Group } from "../../../models/group";
import { User } from "../../../models/user";
import { NotificationType } from "../../../models/notification";
import UserNotification from "./userNotification";

class GroupMemberRequestReceivedNotificationFactory {
    static async create(
        groupAdminId: Types.ObjectId,
        requestedMemberId: Types.ObjectId,
        groupId: Types.ObjectId
    ) {
        const group = await Group.findById(groupId).exec();

        if (!group) {
            console.log("Group not found");
            return null;
        }

        const requestedMember = await User.findById(requestedMemberId).exec();
        if (!requestedMember) {
            console.log("User not found");
            return null;
        }

        return new UserNotification(
            groupAdminId,
            `${requestedMember.fullName} requested to join the group ${group.name}`,
            NotificationType.memberRequest,
            groupId
        );
    }
}

export { GroupMemberRequestReceivedNotificationFactory };
