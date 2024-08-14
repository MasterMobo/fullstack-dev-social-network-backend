import { Schema, model, Types } from "mongoose";
import { IUser } from "./user";

interface IFriendship {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    status: "pending" | "accepted";
}

const friendshipSchema = new Schema<IFriendship>({
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        required: false,
        default: "pending",
        enum: ["pending", "accepted"],
    },
});

const Friendship = model<IFriendship>("Friendship", friendshipSchema);

export { Friendship, IFriendship };
